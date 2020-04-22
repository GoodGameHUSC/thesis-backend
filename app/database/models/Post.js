const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  shop_id: Schema.Types.ObjectId,
  gallery: [String],
  product_id: Schema.Types.ObjectId,
  phone_number: String,
  content: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  viewed_number: Number,
  comment_number: Number,
  like_number: Number,
  comments: [Schema.Types.ObjectId],
  tag: [String]
});

PostSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const PostModel = mongoose.model('Post', PostSchema)
export default PostModel;