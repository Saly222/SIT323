const express = require('express');
const app = express();
const port = 3040;

app.get('/', (req, res) => {
  res.send('Hello from Node.js on GKE with monitoring!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
