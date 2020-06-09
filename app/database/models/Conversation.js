const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatUserModelSchema = new Schema({
  modelType: String,
  id: Schema.Types.ObjectId,
  avatar: String,
  name: String,
  alias: String
});

const ConversationSchema = new Schema({
  room_id: String,
  user_id: [Schema.Types.ObjectId],
  chat_user: Object,
  created_at: Date,
  name: String,
  mode: String
});

const ConversationModel = mongoose.model('Conversation', ConversationSchema)
export const ChatUserModel = mongoose.model('ChatUserModel', ChatUserModelSchema)
export default ConversationModel;