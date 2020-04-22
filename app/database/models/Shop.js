const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({
  username_id: Schema.Types.ObjectId,
  name: String,
  title: String,
  phone_number: String,
  location: Object,
  address: String,
  description: String,
  brand_image: String,
  brand_background: String,
  follower_number: Number,
  average_rate: [Number],
  rates: [Object],
  website_url: String,
  fb_shop_url: String
});

ShopSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const ShopModel = mongoose.model('Shop', ShopSchema)
export default ShopModel;