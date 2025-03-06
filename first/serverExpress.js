// Import the express and path modules
const express = require('express');
const path = require('path');

// Create an instance of express
const app = express();

// Define a port number
const port = 3000;

// Serve the index.html file
app.use(express.static(path.join(__dirname)))

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});