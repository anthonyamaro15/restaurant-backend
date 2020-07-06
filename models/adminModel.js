const db = require("../data/config-db");

function add(body) {
  return db("admin").insert(body, "id");
}

function findBy(filter) {
  return db("admin").where(filter);
}

function updateAdmin(id, changes) {
  return db("admin").where({ id }).update(changes);
}

module.exports = {
  add,
  findBy,
  updateAdmin,
};
