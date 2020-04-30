// const app = require('express')();
// import { getCrawlerConnection } from '../../bootstraps/init_database';
// import ProductModel from '../../database/models/Product';
// import CategoryModel from '../../database/models/Category';
// const mongoose = require('mongoose')
// //https://levelup.gitconnected.com/building-your-graphql-api-with-node-and-mongodb-799a2b9ae0b4
// app.get('/', (req, res, next) => {
//   res.send("Hello API");
// });

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * Math.floor(max - min)) + min;
// }

// app.get('/craw', (req, res, next) => {
//   getCrawlerConnection((db, client) => {
//     const collection = db.collection('products');
//     collection.find({}).toArray(async function (err, docs) {
//       if (err) console.log(err);
//       console.log("Found the following records");
//       const map = await getMap();
//       const cleaned_data = docs.map(e => {
//         return {
//           name: e.name,
//           description: e.description,
//           category_id: mongoose.mongo.ObjectId(map[e.category]),
//           user_id: e.posted_by,
//           price: e.price,
//           gallery: e.images ? e.images.map(image => {
//             return {
//               _id: image._id,
//               link: image.small ? image.small.image_url : image.medium.image_url
//             }
//           }) : null,
//           location: e.location.coordinates,
//           average_rate: 4,
//           ship_fee: 20000,
//           rating: [getRandomInt(500, 1000), getRandomInt(200, 250)]
//         }
//       })
//       console.log(JSON.stringify(cleaned_data))
//       ProductModel.insertMany(cleaned_data, function (err, mongooseDocuments) {
//         if (err) console.log(err);
//         console.log("Inserted data")
//         console.log(mongooseDocuments)
//       })
//       res.send("OK");
//       client.close();
//     });
//   })
// });

// const getMap = () => {
//   return new Promise((res, rej) => {
//     CategoryModel.find({}, '_id', function (err, docs) {
//       const new_id_list = docs.map(e => e._id);
//       getCrawlerConnection((db, client) => {
//         const collection = db.collection('categories');
//         collection.find({}).toArray(function (err, docs) {
//           let object_map = {};
//           docs.forEach((element, key) => {
//             object_map[element._id] = "" + new_id_list[key];
//           });
//           res(object_map);
//         })
//       })
//     });
//   });
// }
