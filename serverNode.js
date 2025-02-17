// Import the http and fs modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define a port number
const port = 3000;

// Create a server
const server = http.createServer((req, res) => {
  // Set the file path to index.html
  const filePath = path.join(__dirname, 'combined.html');

  // Read the index.html file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error\n');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
});

// Start the server and listen on the defined port
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});