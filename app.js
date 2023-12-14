const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Define routes for your API
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Other routes and logic here...

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
