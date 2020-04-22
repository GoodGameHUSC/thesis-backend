
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let list_job = [];
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' && file.indexOf('index') == -1);
  })
  .forEach(file => {
    const job = require(path.join(__dirname, file));
    list_job.push(job);
  });

// TODO: Load list data from db and start which job should run
// console.log(list_job);
