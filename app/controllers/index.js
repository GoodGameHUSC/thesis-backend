const app = require('express')();

/**
 * Api route
 **/
app.use('/api', require("./api/index"));
module.exports = app;