var { buildSchema } = require('graphql');

import BookSchema from './app/database/graphql/book/index';
// Construct a schema, using GraphQL schema language
const schema = BookSchema;

export { schema }