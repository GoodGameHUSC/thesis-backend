const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingReplySchema = new Schema({
  rating_id: Schema.Types.ObjectId,
  content: String,
  image: String,
  createdAt: Date,
}, {
  timestamps: true
});


const RatingReplyModel = mongoose.model('RatingReply', RatingReplySchema)

const RatingSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  content: String,
  star: Number,
  image: String,
  replies: [Object],
  quick_reviews: [String]
}, {
  timestamps: true
});


const paginate = require('../plugins/paginate');
RatingSchema.plugin(paginate);
const RatingModel = mongoose.model('Rating', RatingSchema)
export default RatingModel;
export {
  RatingReplyModel
};

