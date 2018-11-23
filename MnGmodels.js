"strict use"

const mongoose = require('mongoose');

const blogpostSchema = mongoose.Schema({
  title: { type: String, required: true},
  author: {
  firstName: type: String,
  lastName: type: String,
  required: true
  },
  content: { type: String, required: true}
});

blogpostSchema.virtual("authorName").get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogpostSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.authorName,
    content: this.content
  };
};

const Blog = mongoose.model("blog-post", blogpostSchema);

module.export = { Blog };
