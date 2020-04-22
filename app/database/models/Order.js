const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  shop_id: Schema.Types.ObjectId,
  number: Number,
  product_id: Schema.Types.ObjectId,
  created_at: Date,
  status: Number,
  price: Number,
  voucher: [Object],
  milestone: [Object]
});

OrderSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const OrderModel = mongoose.model('Order', OrderSchema)
export default OrderModel;