
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders_items', function (table) {
      table.integer('orders_id').references('orders.id').onDelete('CASCADE');
      table.integer('items_id').references('items.id').onDelete('CASCADE');
      table.integer('quantity');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders_items')
  ])
};
