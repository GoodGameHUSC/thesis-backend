const mongoose = require('mongoose');
const { Schema } = mongoose;

const LiveSchema = new Schema({
  name: String,
  description: String,
  products: [Schema.Types.ObjectId],
  shop_id: Schema.Types.ObjectId,
  video_id: String,
  schedule_time: Date,
  current_viewer_number: Number,
  max_viewer_number: Number,
});


const LiveModel = mongoose.model('Live', LiveSchema)
export default LiveModel;