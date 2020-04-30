const app = require('express')();

app.use('/product', require("./app/product"));

app.get('/', (req, res, next) => {
  res.send("Hello API");
});

module.exports = app;