"strict use"

const mongoose = require('mongoose');

const blog-postSchema = mongoose.Schema({
  title: { type: String, required: true},
  author: {
  firstName: type: String,
  lastName: type: String,
  required: true
  },
  content: { type: String, required: true}
});

blog-postSchema.virtual("authorName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blog-postSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.authorName,
    content: this.content
  };
};

const Blog = mongoose.model("blog-post", blog-postSchema);

module.export = { Blog };
