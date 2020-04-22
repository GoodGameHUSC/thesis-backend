const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
  room_id: String,
  user_id: [Schema.Types.ObjectId],
  created_at: Date,
  name: String,
  mode: String
});


const ConversationModel = mongoose.model('Conversation', ConversationSchema)
export default ConversationModel;