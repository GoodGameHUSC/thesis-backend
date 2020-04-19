const alwayAllowOrigins = [
  'http://localhost:3000',
  'http://yourapp.com'
];

const productAllowOrigins = [
  'https://tedious.app'
]

const devAllowOrigins = [
  'http://localhost:3000'
]

const testAllowOrigins = [
  'https://tedious.app',
  'http://localhost:3000'
]

const msg = 'The CORS policy for this site does not allow access.';

export default {
  origin: function (origin, callback) {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (alwayAllowOrigins.indexOf(origin) === -1) {

      if (process.env.NODE_ENV === 'production') {
        if (productAllowOrigins.indexOf(origin) !== -1)
          return callback(null, true);
        else return callback(new Error(msg), false);

      }
      else if (process.env.NODE_ENV === 'development') {
        if (devAllowOrigins.indexOf(origin) !== -1)
          return callback(null, true);
        else return callback(new Error(msg), false);

      } else if (process.env.NODE_ENV === 'test') {
        if (testAllowOrigins.indexOf(origin) !== -1)
          return callback(null, true);
        else return callback(new Error(msg), false);
      }

      return callback(new Error(msg), false);
    } else return callback(null, true);
  }
}