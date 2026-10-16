require('dotenv').config();
const express = require('express');
const postController = require('./controllers/postController');

const app = express();
app.use(express.json());

app.get('/posts', postController.list);
app.get('/posts/:id', postController.get);
app.post('/posts', postController.create);
app.patch('/posts/:id', postController.update);
app.delete('/posts/:id', postController.remove);

app.use((error, req, res, next) => {
  // Keep database internals and raw Prisma error details out of API responses.
  const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const message = status >= 500 ? 'Internal server error' : error.message;
  return res.status(status).json({ error: message });
});

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => console.log('API listening'));
}

module.exports = app;
