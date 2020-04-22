const mongoose = require('mongoose');
const { Schema } = mongoose;

const VoucherSchema = new Schema({
  name: String,
  value: Number,
  type: Number,
  created_at: String,
  shop_id: Schema.Types.ObjectId,
  category_id: Schema.Types.ObjectId,
  created_at: Date
});


const VoucherModel = mongoose.model('Voucher', VoucherSchema)
export default VoucherModel;