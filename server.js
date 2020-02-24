const express = require('express');
require('dotenv').config();
require('./data/reddit-db')

const app = express();

var cookieParser = require('cookie-parser');
app.use(cookieParser()); // Add this after you initialize express.
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

//We're using Handlebars for ExpressJS
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

app.set('view engine', 'handlebars');

// In order to parse text (e.g. text from when a user creates a new post)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// The data structure for Post
const Post = require('./models/post');

//Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


//The port for this website
app.listen(3000, () => {
  console.log("Listening to port 3000");
});


module.exports = app;
