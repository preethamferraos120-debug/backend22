const express = require('express');
const auditWrite = require('../middleware/auditWrite');

const router = express.Router();

const posts = [{ id: 1, title: 'Hello World' }];

router.get('/', (req, res) => {
  res.json({ data: posts });
});

router.post('/', auditWrite, (req, res) => {
  const post = { id: posts.length + 1, title: req.body.title || 'Untitled' };
  posts.push(post);
  res.status(201).json({ data: post });
});

module.exports = router;
