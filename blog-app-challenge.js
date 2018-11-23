"use strict"

const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// const config?
const { PORT, DATABASE_URL } = require('./appConfig');
const = { Blog } = require('./seed-data');


const app = express();
app.use(express.json());
// does - dash cause an interference in coding? Check with Ali at 3pm today.
app.get('/blog-posts', (req, res) => {
  Blog.find()
  .then(blog-posts => {
    res.json({
      blog-posts: blog-posts.map(blog-post => blog-post.serialize())
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal service error"});
  });
});

app.get('/blog-posts/:id', (req, res) => {
  Blog
  .findbyId(req.params.id)
  .then(blog-post => res.json(blog-post.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal service error"});
  });
});

app.post('/blog-posts', (req, res) => {
  const requiredFields = ['title','author', 'content'];
  for(i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in res.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message)
    }
  }
  Blog.create({
    title: res.body.title,
    author: res.body.author = [res.body.firstName, res.body.lastName],
    content: res.body.content
  })
  .then(blog-post => res.status(201).json(blog-post.serialize()))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal service error'});
  });
});

app.put('/blog-posts/:id', (req, res) => {
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message =
    `Request path id (${req.params.id}) and request body id` +
    `(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }
  const toUpdate = {};
  const updateableFields = ["title", "author", "content"];
  updateableFields.forEach(field => {
    if(field in res.body) {
      toUpdate[field] = res.body[field];
    }
  });
  Blog
  .findByIdAndUpdate(req.params.id, {$set: toUpdate})
  .then(blog-post => res.status(204).end())
  .catch(err => res.status(500).json({
    message: 'Internal service error'}));
});

app.delete('/blog-posts/:id', (req, res) => {
  Blog.findByIdAndRemove(res.params.id)
  .then(blog-post => res.status(204).end());
  .catch(err => res.status(500).json({
    message: 'Internal service error'
  }));
});

app.use("*", function(req, res) {
  res.status(204).json({message: 'Not Found'});
});

function runServer(databaseUrl, port = PORT){
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      err => {
        if (err) {
          return reject(err);
        }
        server = app
        .listen(port, () => {
          console.log(`your app is listening on port ${port}`);
          resolve();
        })
        .on("error", app => {
          mongoose.disconnect();
          reject(err);
        });
      }
    );
  });
}

function closeServer(){
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Close up server');
      server.close(err => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}

module.exports = {app, runServer, closeServer};
