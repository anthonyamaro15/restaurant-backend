exports.up = function (knex) {
  return knex.schema
    .createTable("admin", (table) => {
      table.increments();
      table.string("email", 255).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("resetLink", 255);
    })

    .createTable("items", (table) => {
      table.increments();
      table.string("name", 255).notNullable();
      table.string("img_url", 255).notNullable();
      table.float("price").notNullable();
      table.string("desc_english", 255).notNullable();
      table.string("desc_spanish", 255).notNullable();
      table.string("category", 255).notNullable();
      table
        .integer("admin_id")
        .unsigned()
        .notNullable()
        .references("admin.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items").dropTableIfExists("admin");
};
