exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.integer('price');
      table.integer('restaurant_id').references('restaurant.id').onDelete('CASCADE');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items')
  ])
};
