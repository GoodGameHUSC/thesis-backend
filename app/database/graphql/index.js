
const path = require('path');
import { makeExecutableSchema } from 'graphql-tools';
import { importSchema } from 'graphql-import';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';


const typeDefs = importSchema(path.join(__dirname, 'typeDefs.graphql'));
const rootResolvers = require('./resolvers.js')

const AppSchema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    ...scalarsTypeDefs
  ],
  resolvers: {
    ...rootResolvers,
    ...scalarsResolvers
  },
});

export default AppSchema;



// https://hasura.io/learn/graphql/react-native/apollo-client/
// https://www.djamware.com/post/5c75d68880aca754f7a9d1ed/node-express-angular-7-graphql-and-mongodb-crud-web-app#install-mongoose-mongodb