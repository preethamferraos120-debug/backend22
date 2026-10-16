require('dotenv').config();
const prisma = require('../src/lib/prisma');

async function main() {
  // Safe to rerun: these upserts leave the same deterministic demo data.
  const user = await prisma.user.upsert({
    where: { id: 1 },
    update: { name: 'Demo User' },
    create: { id: 1, name: 'Demo User' }
  });

  await prisma.post.upsert({
    where: { id: 1 },
    update: { title: 'First post', body: 'The contract survives storage changes.', authorId: user.id },
    create: { id: 1, title: 'First post', body: 'The contract survives storage changes.', authorId: user.id }
  });

  await prisma.post.upsert({
    where: { id: 2 },
    update: { title: 'Second post', body: 'Migrations record database design.', authorId: user.id },
    create: { id: 2, title: 'Second post', body: 'Migrations record database design.', authorId: user.id }
  });

  console.log('Database seed completed.');
}

main()
  .catch(() => {
    console.error('Database seed failed. Check DATABASE_URL and migration status.');
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
