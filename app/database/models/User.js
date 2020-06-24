const mongoose = require('mongoose');
import ShopModel from './Shop';
const { Schema } = mongoose;

const SocialAccountSchema = new Schema({
  origin_id: String,
  provider: String,
  additional_info: Object
}, {
  timestamps: true
});
const SocialAccModel = mongoose.model('SocialAccount', SocialAccountSchema)

const CartSchema = new Schema({
  product_id: Schema.Types.ObjectId,
  product_snapshot: Object,
  amount: Number
}, {
  timestamps: true
});
const CartModel = mongoose.model('CartAccount', CartSchema)

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone_number: String,
  display_name: String,
  bio: String,
  gender: Number,
  validated: Boolean,
  avatar: String,
  background_image: String,
  social_account: [Object],
  address_book: [Object],
  payment_account: [Object],
  setting: Object,
  cart: [Object],
  wishlist: [Object],
  secret_info: Object,
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  interested: {
    type: [Object],
    // get: function () {
    //   return this.interested.map(e => e.keyword)
    // },
    // set: function (new_keywords) {
    //   let current = this.interested
    //   new_keywords.forEach(element => {
    //     let exited = false
    //     current.forEach(current_object => {
    //       if (current_object.keyword === element) {
    //         exited = true;
    //         current_object.times++;
    //       }
    //     })
    //     if (!exited) current.push({ keyword: element, times: 1 })
    //   });

    //   current.sort(function (x, y) { return -(x.times - y.times) });
    //   current.slice(0, 10);
    //   return current;
    // }
  }
}, {
  timestamps: true
});


UserSchema.virtual('stripe_account_id').get(function () {
  try {
    const stripe_accounts = this.payment_account.filter(method => method.type == 'stripe');
    if (stripe_accounts.length == 0) return null
    const stripe_account = stripe_accounts[0];
    return stripe_account.info.stripe_account_id
  } catch (error) {
    console.log(error)
    return null;
  }
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel;
export {
  SocialAccModel,
  CartModel
}