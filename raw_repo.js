const connectedKnex = require('./knex_connector')

function getRawResult(raw_query) {
  return connectedKnex.raw(raw_query);
}

module.exports = {
  getRawResult
}