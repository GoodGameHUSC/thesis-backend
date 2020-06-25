const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  sender_id: Schema.Types.ObjectId,
  content: String,
  type: String,
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  }
}, {
  timestamps: true
});


const MessageModel = mongoose.model('Message', MessageSchema)
export default MessageModel;