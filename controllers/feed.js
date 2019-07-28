const { validationResult } = require('express-validator');
const Posts = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: 'First Post', content: 'This is the first post!' }]
  });
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
  }
  const title = req.body.title;
  const content = req.body.content;

  const post = new Posts({
    title,
    content
  });

  try {
    const result = await post.save();

    return res.status(201).json({
      message: 'Post created successfully!',
      post: result
    });
  } catch (err) {
    return res.status(422);
  }
};
