const express = require('express');
const app = express();

require('./data/reddit-db')

const bodyParser = require('body-parser');

//We're using Handlebars for ExpressJS
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// In order to parse text (e.g. text from when a user creates a new post)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// The data structure for Post
const Post = require('./models/post');

//GET and POST method for creating a new post
require('./controllers/posts.js')(app);

//The port for this website
app.listen(3000, () => {
  console.log("Listening to port 3000");
});