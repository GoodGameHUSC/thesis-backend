const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender_id: [Schema.Types.ObjectId],
  created_at: Date,
  content: String,
  type: String
});


const MessageModel = mongoose.model('Message', MessageSchema)
export default MessageModel;