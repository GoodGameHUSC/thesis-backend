const app = require('express')();

app.get('/', (req, res, next) => {
  res.success("Hello API");
});

module.exports = app;