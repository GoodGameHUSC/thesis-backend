import {
  GraphQLSchema
} from 'graphql';
import BookQuery from './BookQuery';
import BookMutator from './BookMutator';
// https://hasura.io/learn/graphql/react-native/apollo-client/
// https://www.djamware.com/post/5c75d68880aca754f7a9d1ed/node-express-angular-7-graphql-and-mongodb-crud-web-app#install-mongoose-mongodb
const BookSchema = new GraphQLSchema({ query: BookQuery, mutation: BookMutator });
export default BookSchema;