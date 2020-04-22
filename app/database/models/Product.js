const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  category_id: [Schema.Types.ObjectId],
  collection_id: [[Schema.Types.ObjectId]],
  location: [String],
  name: String,
  average_rate: [Number],
  ship_fee: Number,
  price: Number,
  discount: Number,
  rating: [Number],
  sold_number: Number,
  gallery: [String],
  status: Number,
  shop_id: Schema.Types.ObjectId,
  feature: [Object],
  description: String,
  list_rating: [Schema.Types.ObjectId]
});

ProductSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const ProductModel = mongoose.model('Product', ProductSchema)
export default ProductModel;