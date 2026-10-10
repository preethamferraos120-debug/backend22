const postsRepository = require('../repositories/postsRepository');

function listPosts() {
  return postsRepository.findAll();
}

function getPost(id) {
  return postsRepository.findById(id);
}

function createPost(fields) {
  if (!fields || !fields.title) {
    const error = new Error('Title is required');
    error.statusCode = 422;
    throw error;
  }

  return postsRepository.create({
    title: fields.title,
    body: fields.body || '',
    authorId: fields.authorId,
  });
}

function updatePost(id, patch) {
  patch = patch || {};
  const allowedPatch = {};
  if (patch.title !== undefined) allowedPatch.title = patch.title;
  if (patch.body !== undefined) allowedPatch.body = patch.body;
  return postsRepository.update(id, allowedPatch);
}

function removePost(id) {
  return postsRepository.remove(id);
}

module.exports = { listPosts, getPost, createPost, updatePost, removePost };
