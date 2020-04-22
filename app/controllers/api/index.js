const app = require('express')();

//https://levelup.gitconnected.com/building-your-graphql-api-with-node-and-mongodb-799a2b9ae0b4
app.get('/', (req, res, next) => {
  res.send("Hello API");
});

module.exports = app;