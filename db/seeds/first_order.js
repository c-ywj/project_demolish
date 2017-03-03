
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert({id: 1, name: 'Parth', address: '46 spadina toronto', phone: '+12899804890'}),
      ]);
    });
};
