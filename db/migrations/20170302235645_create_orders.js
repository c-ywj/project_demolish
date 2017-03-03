
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('address');
      table.string('phone');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
