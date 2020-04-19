import responseCode from '../../../config/responseCode';
import message from '../../definitions/constants/MESSAGE';
import Payment from '../../service/libs/payment';

const requireStripe = async (req, res, next) => {
  // check access token
  let user = req.user;
  if (!user) return res.errors(message.requireLogin, 400, responseCode.auth.require_login)

  if (user.stripe_customer_id) next();
  else try {
    // Create Stripe Account and update 
    const customerStripe = await Payment.createStripeAccountWithEmail(user.name, user.email)
    user.stripe_customer_id = customerStripe.id;
    await user.save();

    req.user = user;
    next();
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export default requireStripe;