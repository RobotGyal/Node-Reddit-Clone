const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The post will not be added to be the database if any of the required fields are empty
const PostSchema = new Schema({
  title:      { type: String, required: true },
  url:        { type: String, required: true },
  summary:    { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author : { type: Schema.Types.ObjectId, ref: "User", required: true }

});


module.exports = mongoose.model('Post', PostSchema);