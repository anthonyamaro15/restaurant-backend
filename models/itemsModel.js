const db = require("../data/config-db");

function add(body) {
  return db("items").insert(body, "id");
}

function findById(id) {
  return db("items").where({ id }).first();
}

function getAll() {
  return db("items");
}

function update(id, changes) {
  return db("items").where({ id }).update(changes);
}

function remove(id) {
  return db("items").where({ id }).del();
}

module.exports = {
  add,
  findById,
  getAll,
  update,
  remove,
};
