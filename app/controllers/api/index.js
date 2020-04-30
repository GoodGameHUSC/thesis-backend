const fs = require('fs');
const path = require('path');
const app = require('express')();
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    app.use("/" + file.replace(".js", ""), require(path.join(__dirname, file)))
  });

app.get('/', (req, res, next) => {
  res.send("Hello API");
});

module.exports = app;