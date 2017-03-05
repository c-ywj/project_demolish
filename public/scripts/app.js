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
    // var 

    if(!currentOrder[itemName]) {
      currentOrder[itemName] = {itemId: itemId, qty: 1};

      let cartItem = `<li data-cart-item="${itemName}">
        <span>
          <i class="remove-item fa fa-times" aria-hidden="true"></i>
          ${itemName}
        </span>
        <div class="cart-qty ${itemName}">
          Qty: 
          
          <span class="cart-item__qty ${itemName}">
            ${currentOrder[itemName]['qty']}
          </span>

          <span class="reduce-item"> 
            <i class="fa fa-window-minimize" aria-hidden="true"></i>
          </span>
        </div>
      </li>`;

      $cartItems.append(cartItem);
    } else {
      currentOrder[itemName]['qty'] += 1;
      let cartItemQty = currentOrder[itemName]['qty'];
      let cartItem = $('.cart-qty').find(`.${itemName}`);

      cartItem.text(cartItemQty);

      console.log(currentOrder);
    }
  });


  // remove item from cart
  $('.remove-item').on('click', function(e) {
    // let currCartItem = $(e.currentTarget).parent().attr('data-cart-item');
    // let currCartItem = $(e.currentTarget);
    let this1 = $(e.currentTarget).parent().attr("data-cart-item");

    console.log(this1);

    delete currentOrder[this1];
    this1.remove();
    
    // console.log(currCartItem);

    // let itemDataAtt = currCartItem.parent().attr("data-cart-item");

    // console.log(currCartItem);
    // console.log(itemDataAtt);
    // $(e.target).parent().parent().remove();

    // delete currentOrder[currCartItem];
    // console.log('currCartItem: ', currCartItem);
  });


  // reduce item qty from cart
  $('.reduce-item').on('click', function(e) {

    let itemQty = currentOrder[itemName]['qty'];
    console.log(`ITEM QTY: ${itemQty}`);

    itemQty --;

    console.log(`UPDATED ITEM QTY`, itemQty);

    // currentOrder[itemName]['qty'] - 1;

    let someNum = $('.cart-qty').find(`.${itemName}`);
    someNum.remove();
    let update = `<span class="cart-item__qty ${itemName}">${currentOrder[itemName]['qty']}</span>`;
    
    $('.cart-qty.' + itemName).append(update);

    console.log(currentOrder);
  });

});