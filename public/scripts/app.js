$(() => {

  let currentOrder = {};

  $('.menu-item').on('click', function (ev) {
    var itemId = $(ev.currentTarget).attr("data-item-id");
    var itemName = $(ev.currentTarget).attr("data-item-name");
    if(!currentOrder[itemName]) {
      currentOrder[itemName] = {itemId: itemId, qty: 1};
    } else {
      currentOrder[itemName]['qty'] += 1;
    }
    console.log(currentOrder);
  });
});

  // $('#ORDER-BUTTON').on('click', (e) => {
  //   e.preventDefault();

  //   $.ajax({
  //     method: 'POST',
  //     url: '/order',
  //     data: $orderItems.serialize()
  //   })
  //   .then((order_item) => {
  //     // what we want to do with the order stuff
  //   })
  //   .catch(() => {
  //     console.error('There was a problem processing the order...');
  //   });
  // });


  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;


  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
