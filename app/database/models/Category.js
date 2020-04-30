const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const CategorySchema = new Schema({
  name: String,
  parent_id: Schema.Types.ObjectId,
  product_number: Number,
  image: String,
  description: String,
  banner: [Object],
  sold_number: Number
});

CategorySchema.plugin(mongoosePaginate);
const CategoryModel = mongoose.model('Category', CategorySchema)
export default CategoryModel;