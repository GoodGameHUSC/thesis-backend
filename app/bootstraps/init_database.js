const mongoose = require('mongoose');
const connect_url = "mongodb://localhost:27017/shoppingMe";
// const connect_url = "mongodb://root@103.92.31.232:27017/?authSource=admin";
mongoose.connect(connect_url)
  .then(() => console.log('### Connection database successful'))
  .catch((err) => console.error(err));