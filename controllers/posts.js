const Post = require('../models/post');
var express = require('express');
var exphbs  = require('express-handlebars');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    console.log("req.body:", req.body)
    const post = new Post(req.body);
    console.log("post object:", post)

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      console.log("err:", err);
      console.log("successful post object:", post)
      return res.redirect(`/`);
    })
  });

  //View all "slash" index showing all posts routes
  Post.find({})
    .then(post => {
      res.render("posts-index", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
};
