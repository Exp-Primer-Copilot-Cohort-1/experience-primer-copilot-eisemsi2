// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up comments
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

// Post comments
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      id: Date.now(),