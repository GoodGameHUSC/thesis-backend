const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({
  total: Number,
  tax: Number,
  sub_total: Number,
  bill_detail: [Object],
  order_id: Schema.Types.ObjectId,
  createdAt: Date,
  payment_method: String,
  status: Number,
  paidAt: Date,
});
export const BillModel = mongoose.model('Bill', BillSchema)

const OrderSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  shop_id: Schema.Types.ObjectId,
  amount: Number,
  product_id: Schema.Types.ObjectId,
  receive_address: Object,
  delivery_method: Object,
  created_at: Date,
  status: Number,
  notes: String,
  price: Number,
  bill: Object,
  voucher: [Object],
  milestone: [Object]
}, {
  timestamps: true
});

const OrderModel = mongoose.model('Order', OrderSchema)
export default OrderModel;