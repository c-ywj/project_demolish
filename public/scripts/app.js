$(() => {
  let $orderCart = $('.order-items');
  let $cartItems = $('.cart-items');
  $orderCart.hide();
  
  let currentOrder = {};

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
        <div class="cart-qty">
          Qty: 
            <span class="cart-item__qty">${currentOrder[itemName]['qty']}</span>
        </div>
      </li>`;
      let $cartItemQty = $('.cart-item__qty');
      $cartItems.append(cartItem);

    } else {
      currentOrder[itemName]['qty'] += 1;
      // $cartItemQty.remove();
      // $cartItemQty.appendTo($('.cart-qty'));
    }
    console.log(currentOrder);
  });
});