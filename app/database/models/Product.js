const mongoose = require('mongoose');
import RatingModel from './Rating';
const { Schema } = mongoose;

const ProductSchema = new Schema({
  category_id: Schema.Types.ObjectId,
  collection_id: [String],
  location: [Object],
  name: String,
  // average_rate: [Number],
  ship_fee: Number,
  price: Number,
  discount: Number,
  rating: {
    type: [Number],
    get: (v) => {
      if (Array.isArray(v)) {
        return Math.round((v[0] / v[1]) * 100) / 100
      }
      else return null;
    }
  },
  sold_number: Number,
  gallery: {
    type: [Object],
    get: (v) => {
      // if (v) {
      //   const list_random = [
      //     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      //     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      //     "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
      //   ]
      //   v.push({
      //     "_id": "5d219e0350402c001c10434",
      //     "link": list_random[Math.floor(list_random.length * Math.random())],
      //     "type": "video"
      //   })
      //   return v;
      // }
      return v;
    }
  },
  status: Number,
  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  feature: [Object],
  description: String,
  list_rating: {
    type: [Object]
  },
  visited_number: Number,
  amount: Number,
  net: Number
}, {
  timestamp: true
});

const paginate = require('../plugins/paginate');
ProductSchema.plugin(paginate);

ProductSchema.virtual('real_price').get(function () {
  return this.discount > 0 ? Math.ceil((this.price * (100 - this.discount)) / 100) : null;
});

// ProductSchema.virtual('list').get(async function () {
//   const list = await RatingModel.find({ product: "5ea8f91a632821087002234b" });
//   debugger;
//   return [];
// });


ProductSchema.set('toJSON', { getters: true, virtuals: true });

ProductSchema.index({ 'name': 'text' }) // full-text search
const ProductModel = mongoose.model('Product', ProductSchema)
export default ProductModel;

const GallerySchema = new Schema({
  link: String
});

export const GalleryModel = mongoose.model('Gallery', GallerySchema)