const initialPosts = [
  { id: 1, title: 'First post', body: 'Repository boundaries protect change.', authorId: 7 },
  { id: 2, title: 'Second post', body: 'Services should speak in domain language.', authorId: 8 },
];

// This Map is an implementation detail. Replacing it with Prisma should only
// change this repository: service validation/business rules, controller response
// shapes, and the five-method repository contract stay unchanged.
const posts = new Map(initialPosts.map((post) => [post.id, { ...post }]));
let nextId = 3;

const postsRepository = {
  findAll() {
    return Array.from(posts.values(), (post) => ({ ...post }));
  },

  findById(id) {
    const post = posts.get(Number(id));
    return post ? { ...post } : null;
  },

  create(fields) {
    const post = { id: nextId++, ...fields };
    posts.set(post.id, post);
    return { ...post };
  },

  update(id, patch) {
    const numericId = Number(id);
    const post = posts.get(numericId);
    if (!post) return null;

    const updated = { ...post, ...patch, id: numericId };
    posts.set(numericId, updated);
    return { ...updated };
  },

  remove(id) {
    return posts.delete(Number(id));
  },
};

module.exports = postsRepository;
