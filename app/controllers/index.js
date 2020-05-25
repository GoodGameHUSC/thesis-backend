const app = require('express')();
import ProductModel from '../database/models/Product';

/**
 * Api route
 **/
app.use('/api', require("./api/index"));


app.use('/home', (req, res) => {
  res.render(process.env.NODE_PATH + '/app/views/home')
})

app.use('/do_something', async (req, res) => {

  let listSample = await ProductModel.find({});
  listSample.forEach(async (product) => {
    product.discount = Math.floor(25 + Math.random() * 55);
    await product.save();
  })
  res.success();
})


module.exports = app;