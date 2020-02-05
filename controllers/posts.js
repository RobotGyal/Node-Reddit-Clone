const Post = require('../models/post');

module.exports = (app) => {
  // GET: Create a new post page
  app.get("/posts/new", (req, res) => {
    res.render('posts-new', {});
  });

  app.post('/posts/new', (req, res) => {
    console.log(req.body.title);
    var post = new Post(req.body);

    post.save().then((post) => {
      return res.redirect('/')
    }).catch((err) => {
      console.log(err.message)
    })

    Post.find({})
      .then(posts => {
        res.render("posts-index", 
        {posts}
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  });

};