exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
      table.string("username").primary().notNullable();
      table.string("email").notNullable();
      table.string("bio");
      table.string("image_url").notNullable();
      table.string("password_hash").notNullable();
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};