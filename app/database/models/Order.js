const mongoose = require('mongoose');
const { Schema } = mongoose;

const BillSchema = new Schema({
  total: Number,
  tax: Number,
  sub_total: Number,
  bill_detail: Object,
  payment_method: String,
  status: Number,
  createdAt: Date,
  paidAt: Date,
});
export const BillModel = mongoose.model('Bill', BillSchema)

const OrderSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  amount: Number,
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  receive_address: Object,
  delivery_method: Object,
  created_at: Date,
  status: Number,
  notes: String,
  price: Number,
  bill: Object,
  voucher: [Object],
  milestone: [Object],
  rating: {
    type: Schema.Types.ObjectId,
    ref: 'Rating'
  },
}, {
  timestamps: true
});

const OrderModel = mongoose.model('Order', OrderSchema)
export default OrderModel;