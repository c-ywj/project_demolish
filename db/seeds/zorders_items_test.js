
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders_items').insert({orders_id: 1, items_id: 2, quantity: 10}),
      ]);
    });
};
