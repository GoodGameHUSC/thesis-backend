const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingSchema = new Schema({
  name: String,
  user_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  content: String,
  star: Number,
  image: String,
  created_at: Schema.Types.Date,
  replies: [Object],
  quick_reviews: [String]
});


const RatingModel = mongoose.model('Rating', RatingSchema)
export default RatingModel;