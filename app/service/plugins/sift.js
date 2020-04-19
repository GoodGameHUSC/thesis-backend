import keys from '../config/env/keys';
const SiftAPI = require('siftapi').default;
const siftEdison = new SiftAPI(keys.edisonApiKey, keys.edisonSecret);

export default siftEdison;