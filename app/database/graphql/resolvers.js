import RootQuery from './query/index';
import RootMutation from './mutator/index';


const rootResolvers = {
  Query: RootQuery,
  Mutation: RootMutation
};
module.exports = rootResolvers;