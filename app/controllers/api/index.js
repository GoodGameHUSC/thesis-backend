const fs = require('fs');
import responseCode from '../../config/responseCode';
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
  // Health Check
  res.send("Hello API");
});

app.get('*', function (req, res) {
  // NOT FOUND
  res.errors("API NOT Exist", 404, responseCode.results.notFound)
});

module.exports = app;