const mongoosePaginate = require('mongoose-paginate-v2');

module.exports = function paginate(schema, options) {
  schema.plugin(mongoosePaginate);

  schema.statics.paginateQuery = function paginateQuery(query, page = 1, limit = 12, query_option = null) {
    let options = { page, limit };
    if (query_option) options = { ...options, ...query_option }
    console.log(query);
    return this.paginate(query, options);
  }
};