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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  content: String,
  star: Number,
  image: String,
  replies: [Object],
  quick_reviews: [String],
  report: Object,
  sentiment: String
}, {
  timestamps: true
});

const paginate = require('../plugins/paginate');
RatingSchema.plugin(paginate);

RatingSchema.virtual('created_at').get(function () {
  return this.createdAt.getTime();
});

RatingSchema.set('toJSON', { getters: true, virtuals: true });

const RatingModel = mongoose.model('Rating', RatingSchema)
export default RatingModel;
export {
  RatingReplyModel
};

