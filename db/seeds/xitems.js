
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({id: 1, name: 'Wings', description: 'Wings you will demolish within minutes if not seconds..', price: 13, restaurant_id: 1}),
        knex('items').insert({id: 2, name: 'Fries', description: 'NAWT yo everyday fries', price: 8, restaurant_id: 1}),
        knex('items').insert({id: 3, name: 'Baked Potato', description: 'Baked, potato, the good kind', price: 9, restaurant_id: 1})
      ]);
    });
};
