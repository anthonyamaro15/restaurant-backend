const db = require("../data/config-db");

function add(body) {
  return db("admin").insert(body, "id");
}

function findBy(filter) {
  return db("admin").where(filter);
}

module.exports = {
  add,
  findBy,
};
