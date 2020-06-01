const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({
  master_id: Schema.Types.ObjectId,
  name: String,
  avatar: String,
  slogan: String,
  title: String,
  phone_number: String,
  location: Object,
  category: [Schema.Types.ObjectId],
  keywords: [String],
  address: String,
  description: String,
  brand_image: String,
  brand_background: String,
  follower_number: Number,
  average_rate: [Number],
  rates: [Object],
  website_url: String,
  fb_shop_url: String,
  social_account: [Object]
});

ShopSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const ShopModel = mongoose.model('Shop', ShopSchema)
export default ShopModel;
const a =
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "BKBTMHA59B.vn.3km.app",
        "paths": ["/san-pham/ * "]
      }
    ]
  }
}