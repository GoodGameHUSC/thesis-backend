import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import BookModel from '../../models/Book';
import BookType from './BookType';


const BookQuery = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      books: {
        type: new GraphQLList(BookType),
        resolve: function () {
          const books = BookModel.find().exec()
          if (!books) {
            throw new Error('Error')
          }
          return books
        }
      },
      book: {
        type: BookType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const bookDetails = BookModel.findById(params.id).exec()
          if (!bookDetails) {
            throw new Error('Error')
          }
          return bookDetails
        }
      }
    }
  }
});

export default BookQuery;