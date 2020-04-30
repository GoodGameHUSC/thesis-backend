const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;
const ProductSchema = new Schema({
  category_id: Schema.Types.ObjectId,
  collection_id: [String],
  location: [Object],
  name: String,
  average_rate: [Number],
  ship_fee: Number,
  price: Number,
  discount: Number,
  rating: [Number],
  sold_number: Number,
  gallery: [Object],
  status: Number,
  shop_id: String,
  feature: [Object],
  description: String,
  list_rating: [String]
});

ProductSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}
ProductSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('Product', ProductSchema)
export default ProductModel;