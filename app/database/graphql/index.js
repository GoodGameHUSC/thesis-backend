
const path = require('path');
import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import rootResolvers from './resolver';

const queryDefs = importSchema(path.join(__dirname, './query/index.graphql'));
const mutationDefs = importSchema(path.join(__dirname, './mutator/index.graphql'));
const AppSchema = makeExecutableSchema({
  typeDefs: [
    queryDefs,
    mutationDefs,
  ],
  resolvers: {
    ...rootResolvers,
  },
});

export default AppSchema;
