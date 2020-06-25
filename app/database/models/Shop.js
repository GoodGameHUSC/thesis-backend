const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({
  master_id: Schema.Types.ObjectId,
  name: String,
  // avatar: String,
  slogan: String,
  email: String,
  phone_number: String,
  location: Object,
  address: String,
  category: [Schema.Types.ObjectId],
  keywords: [String],
  description: String,
  brand_image: String,
  brand_background: String,
  follower_number: Number,
  average_rate: [Number],
  rates: [Object],
  website_url: String,
  fb_shop_url: String,
  is_active: Boolean,
  social_account: [Object]
});

ShopSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const ShopModel = mongoose.model('Shop', ShopSchema)
export default ShopModel;