$(() => {
  let $orderCart = $('.order-items');
  let $cartItems = $('.cart-items');
  // $orderCart.hide();
  
  let currentOrder = {};

  // add new item to cart
  $('.menu-item').on('click', function (ev) {
    // $orderCart.show();

    var itemId = $(ev.currentTarget).attr("data-item-id");
    var itemName = $(ev.currentTarget).attr("data-item-name");

    if(!currentOrder[itemName]) {
      currentOrder[itemName] = {itemId: itemId, qty: 1};

      let cartItem = `<li data-cart-item="${itemName}">
        <h3>${itemName}</h3>
        <div class="remove-item">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="cart-qty ${itemName}">
          <span class="reduce-item"> 
            <i class="fa fa-window-minimize" aria-hidden="true"></i>
          </span>

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


    // remove item from cart
    $('.remove-item').on('click', function(e) {
      let currCartItem = $(e.target).parent().parent().attr('data-cart-item');
      $(e.target).parent().parent().remove();

      delete currentOrder[currCartItem];
      console.log('currCartItem: ', currCartItem);
    });

    // reduce item qty from cart
    $('.reduce-item').on('click', function(e) {

      // let itemQty = currentOrder[itemName]['qty'];
      // itemQty - 1;

      currentOrder[itemName]['qty'] - 1;

      let someNum = $('.cart-qty').find(`.${itemName}`);
      someNum.remove();
      let update = `<span class="cart-item__qty ${itemName}">${currentOrder[itemName]['qty']}</span>`;
      
      $('.cart-qty.' + itemName).append(update);

      console.log(currentOrder);
    });
  
  });

});