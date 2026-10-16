const prisma = require('../lib/prisma');

// Translate Prisma failures into stable, safe domain errors at the repository boundary.
function handleDatabaseError(error) {
  if (error?.code === 'P2002') {
    const conflict = new Error('A record with these values already exists');
    conflict.statusCode = 409;
    throw conflict;
  }

  if (error?.code === 'P2003') {
    const conflict = new Error('The related record does not exist');
    conflict.statusCode = 409;
    throw conflict;
  }

  // Do not let raw database/Prisma messages reach clients through the API handler.
  const safeError = new Error('Database operation failed');
  safeError.statusCode = 500;
  throw safeError;
}

async function findAll() {
  try {
    return await prisma.post.findMany({ orderBy: { id: 'asc' } });
  } catch (error) {
    handleDatabaseError(error);
  }
}

async function findById(id) {
  try {
    return await prisma.post.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    handleDatabaseError(error);
  }
}

async function create(fields) {
  try {
    return await prisma.post.create({
      data: {
        title: fields.title,
        body: fields.body || '',
        authorId: fields.authorId
      }
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

async function update(id, patch) {
  try {
    return await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...(patch && patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch && patch.body !== undefined ? { body: patch.body } : {})
      }
    });
  } catch (error) {
    if (error?.code === 'P2025') return null;
    handleDatabaseError(error);
  }
}

async function remove(id) {
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    return true;
  } catch (error) {
    if (error?.code === 'P2025') return false;
    handleDatabaseError(error);
  }
}

module.exports = { findAll, findById, create, update, remove };
