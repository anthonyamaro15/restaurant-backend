exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("admin")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("admin").insert([{ email: "example.com", password: "pass" }]);
    });
};
