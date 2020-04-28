const app = require('express')();

/**
 * Api route
 **/
app.use('/api', require("./api/index"));


app.use('/home', (req, res) => {
  res.render(process.env.NODE_PATH + '/app/views/home')
})

module.exports = app;