const admin = require("firebase-admin")

const serviceAccount = require("../../../serviceAccount.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://tedious2018-1521676086012.firebaseio.com',
  storageBucket: "tedious2018-1521676086012.appspot.com",
});