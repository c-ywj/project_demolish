
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('restaurant').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('restaurant').insert({id: 1, name: 'Carpaflo', phone: '+16478940916'})
      ]);
    });
};
