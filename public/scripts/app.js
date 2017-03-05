$(() => {
  var $orderCart = $('.order-items');
  var $cartItems = $('.cart-items');
  $orderCart.hide();
  
  var currentOrder = {};
  var subtotal = [];

  // update item price in cart based on qty
  var pricePerQty = function(originalPrice, currItemPrice) {
    var price = Math.round(parseFloat(originalPrice) * 100) / 100;
    subtotal.push(price);

    function newPrice(currItemPrice) { 
      price += Math.round(parseFloat(currItemPrice) * 100) / 100;
      return Math.round(parseFloat(price) * 100) / 100;
    }
    // subtotal.push(newPrice(currItemPrice));
    console.log(subtotal);
    return newPrice(currItemPrice);
  }

  var getSubtotal = function(subtotal) {
    var finalSubtotal = 0;

    for (var i = 0; i < subtotal.length; i++) {
      finalSubtotal += subtotal[i];
    }

    return Math.round(finalSubtotal * 100) / 100;
  }

  var getTax = function (subtotal) {
    var total = getSubtotal(subtotal);
    var tax = 0.13;

    return Math.round((total * tax) * 100) / 100;
  }

  var getTotal = function (subtotal, tax) {
    var finalSubtotal = getSubtotal(subtotal);
    
    return Math.round((finalSubtotal + tax) * 100) / 100;
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
      subtotal.push(parseFloat(itemPrice));

      var cartItem = `<li data-cart-item="${itemName}">
        <span class="remove-item"><i class="fa fa-times" aria-hidden="true"></i></span>
        ${fullItemName}
        $<span class="item-qty-price ${itemName}">${itemPrice}</span>

        <div class="cart-qty ${itemName}">
          Qty: 
          
          <span class="cart-item__qty ${itemName}">
            ${currentOrder[itemName]['qty']}
          </span>

          <span class="reduce-item-qty"> 
            <i class="fa fa-window-minimize" aria-hidden="true"></i>
          </span>
        </div>
      </li>`;

      $cartItems.append(cartItem);

      $('.sub-total').text(getSubtotal(subtotal));
      $('.tax').text(getTax(subtotal));
      $('.total').text(getTotal(subtotal, getTax(subtotal)));
    } else {
      // update quantity in object
      currentOrder[itemName]['qty'] += 1;

      var currCartItemPrice = $(`.item-qty-price.${itemName}`).text();
      var newPrice = pricePerQty(itemPrice, currCartItemPrice);
      var cartItemQty = currentOrder[itemName]['qty'];
      var cartItem = $('.cart-qty').find(`.${itemName}`);
      var cartItemPrice = $(`.item-qty-price.${itemName}`);

      // update cart on browser
      cartItem.text(cartItemQty);
      cartItemPrice.text(String(newPrice).slice(0,5));

      $('.sub-total').text(getSubtotal(subtotal));
      $('.tax').text(getTax(subtotal));
      $('.total').text(getTotal(subtotal, getTax(subtotal)));
    }

    console.log(getSubtotal(subtotal));


    $('.remove-item i').on('click', function (ev) {
      $(this).parent().parent().remove();
      delete currentOrder[itemName];
    });

  });

  // remove item from cart
  // var $removeItem = $('.remove-item');

  // $removeItem.on('click', 'div', function(e) {
  //   let cartItem = $(e.currentTarget).parent().attr("data-cart-item");

  //   console.log(cartItem);

  //   delete currentOrder[cartItem];
  //   cartItem.remove();
    
    // console.log(currCartItem);

    // let itemDataAtt = currCartItem.parent().attr("data-cart-item");

    // console.log(currCartItem);
    // console.log(itemDataAtt);
    // $(e.target).parent().parent().remove();

    // delete currentOrder[currCartItem];
    // console.log('currCartItem: ', currCartItem);
  // });


  // reduce item qty from cart
  $('.reduce-item-qty').on('click', function(e) {

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