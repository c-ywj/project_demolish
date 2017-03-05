$(() => {
  var $orderCart = $('.order-items');
  var $cartItems = $('.cart-items');
  $orderCart.hide();
  
  var currentOrder = {};

  // update item price in cart based on qty
  var pricePerQty = function(originalPrice, currItemPrice) {
    var price = parseFloat(originalPrice);

    function newPrice(currItemPrice) { 
      price += parseFloat(currItemPrice);
      return parseFloat(price);
    }
    return newPrice(currItemPrice);
  }

  // add new item to cart
  $('.menu-item').on('click', function (ev) {
    if($orderCart.is(':hidden')) {
      $orderCart.slideToggle();
    }

    var itemId = $(ev.currentTarget).attr("data-item-id");
    var itemName = $(ev.currentTarget).attr("data-item-name");
    var fullItemName = $(ev.currentTarget).find(".item-name").text();
    var itemPrice = $(ev.currentTarget).find(".item-price").text();

    if(!currentOrder[itemName]) {
      currentOrder[itemName] = {itemId: itemId, qty: 1};

      var cartItem = `<li data-cart-item="${itemName}">
        <div>
          <i class="remove-item fa fa-times" aria-hidden="true"></i>
          ${fullItemName}
          $<span class="item-qty-price ${itemName}">${itemPrice}</span>
        </div>
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

      var currCartItemPrice = $(`.item-qty-price.${itemName}`).text();
      var newPrice = pricePerQty(itemPrice, currCartItemPrice);

      var cartItemQty = currentOrder[itemName]['qty'];
      var cartItem = $('.cart-qty').find(`.${itemName}`);
      var cartItemPrice = $(`.item-qty-price.${itemName}`);


      console.log('CART ITEM PRICE: ', newPrice);

      cartItem.text(cartItemQty);
      cartItemPrice.text(String(newPrice).slice(0,5));

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