$(() => {

  let $orderCart = $('.order-items');
  let $cartItems = $('.cart-items');
  $orderCart.hide();

  let currentOrder = {};

 // add new item to cart
  $('.menu-item').on('click', function (ev) {
    $orderCart.show();

  var itemId = $(ev.currentTarget).attr("data-item-id");
  var itemName = $(ev.currentTarget).attr("data-item-name");

  if(!currentOrder[itemName]) {
    currentOrder[itemName] = {itemId: itemId, qty: 1};

      let cartItem = `<li>
      <h3>${itemName}</h3>
      <div class="remove-item">
      <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="cart-qty ${itemName}">
      Qty:
      <span class="cart-item__qty ${itemName}">${currentOrder[itemName]['qty']}</span>
      </div>
      </li>`;

      $cartItems.append(cartItem);
  } else {
      currentOrder[itemName]['qty'] += 1;

      let someNum = $('.cart-qty').find(`.${itemName}`);
      someNum.remove();
      let update = `<span class="cart-item__qty ${itemName}">${currentOrder[itemName]['qty']}</span>`;

      $('.cart-qty.' + itemName).append(update);
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
