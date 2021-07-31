const connectedKnex = require('./knex_connector')


function getAllAccount() {
  return connectedKnex("accounts").select('*');
}

function getAccountById(id) {
   return connectedKnex('accounts').select('*').where('id', id).first();
}

function addAccount(acc) {
  return connectedKnex('accounts').insert(acc);
}

function updateAccount(acc, id) {
  return connectedKnex("accounts").where('id', id).update(acc)
}

function deleteAccount(id) {
  return connectedKnex('accounts').where('id', id).del()
}

module.exports = {
  getAllAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  getAccountById
}