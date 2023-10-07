const express = require('express');
const app = express();
const pool = require('./queries.js');
const route = require('./route.js');
app.use(route);

pool.connect((err, res) => {
  console.log(err);
  console.log('connected');
});

app.listen(4000);