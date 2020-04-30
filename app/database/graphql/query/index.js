
import ProductModel from '../../models/Product.js';
const RootQuery = {
  users(obj, args, context, info) {
    return [{
      text: 'Haha'
    }];
  },
  user(obj, args, context, info) {
    return {
      username: 'Hung',
      setting: {
        "name": "Haha"
      }
    }
  },
  async get_products(obj, args, context, info) {
    const books = await ProductModel.find({}).limit(100).exec();
    return books;
  }
}

export default RootQuery;