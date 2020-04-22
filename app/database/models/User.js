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
  updated_date: { type: Date, default: Date.now },
  cart: [Object]
});

UserSchema.methods.findFriends = function () {
  return new Promise((res, rej) => {

  });
}

const UserModel = mongoose.model('User', UserSchema)
export default UserModel;