const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  cart: [Object]
}, {
  timestamps: true
});

UserSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

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