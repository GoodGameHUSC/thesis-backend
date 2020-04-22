import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  // GraphQLDate
  // GraphQLDate
} from 'graphql';

const BookType = new GraphQLObjectType({
  name: 'book',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      isbn: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      author: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      published_year: {
        type: GraphQLInt
      },
      publisher: {
        type: GraphQLString
      },
      // updated_date: {
      //   type: GraphQLDate
      // }
    }
  }
});

export default BookType;