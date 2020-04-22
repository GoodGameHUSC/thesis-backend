const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollectionSchema = new Schema({
  name: String,
  parent_id: Schema.Types.ObjectId,
  product_number: Number,
  image: String,
  description: String,
  banner: [Object],
  sold_number: Number
});


const CollectionModel = mongoose.model('Collection', CollectionSchema)
export default CollectionModel;