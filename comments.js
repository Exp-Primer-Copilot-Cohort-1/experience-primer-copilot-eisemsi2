// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  console.log('path', path);
  if (path === '/') {
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  } else if (path === '/comments') {
    fs.readFile(__dirname + '/comments.json', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading comments.json');
      }
      res.writeHead(200);
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');