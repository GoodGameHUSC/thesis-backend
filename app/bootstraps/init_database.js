const mongoose = require('mongoose');
const connect_url = "mongodb://localhost:27017/shoppingMe";
// const connect_url = "mongodb://root@103.92.31.232:27017/?authSource=admin";
mongoose.connect(connect_url)
  .then(() => console.log('### Connection database successful'))
  .catch((err) => console.error(err));


const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:example@103.92.31.232:27017/3kmdb?authSource=admin';
const dbName = '3kmdb';

export const getCrawlerConnection = (callback) => {
  MongoClient.connect(url, (err, client) => {
    console.log(`Connected successfully to ${dbName}`);
    const db = client.db(dbName);
    callback(db, client);
  });
}
