import env from '../../config/env';

const stripeLive = require('stripe')(env.STRIPE_KEY_LIVE);
const stripeDev = require('stripe')(env.STRIPE_KEY_DEV);
const stripe = process.env.NODE_ENV == 'production' ? stripeLive : stripeDev ;

export { stripeLive, stripeDev };
export default stripe;