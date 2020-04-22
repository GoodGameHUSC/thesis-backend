const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
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


const CommentModel = mongoose.model('Comment', CommentSchema)
export default CommentModel;