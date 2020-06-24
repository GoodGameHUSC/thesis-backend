const mongoose = require('mongoose');
const { Schema } = mongoose;

const SAResultSchema = new Schema({
  content: String,
  language: String,
  label: String,
}, {
  timestamps: true
});


const SAResultS = mongoose.model('SAResult', SAResultSchema)
export default SAResultS;