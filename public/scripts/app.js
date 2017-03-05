$(() => {

  var $orderCart = $('.order-items');
  var $cartItems = $('.cart-items');
  var currentOrder = {};

      $orderCart.hide();

  // update item price in cart based on qty
  var pricePerQty = function(originalPrice, currItemPrice) {

    var price     = parseFloat(originalPrice);

    function newPrice(currItemPrice) {
      price += parseFloat(currItemPrice);
      return   parseFloat(price);
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

      var cartItem =

      `
      <li id="${itemName}" data-cart-item="${itemName}">
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

      </li>
      `;

      $cartItems.append(cartItem);
    } else {
      // update quantity in object
      currentOrder[itemName]['qty'] += 1;

      var currCartItemPrice = $(`.item-qty-price.${itemName}`).text();
      var newPrice          = pricePerQty(itemPrice, currCartItemPrice);
      var cartItemQty       = currentOrder[itemName]['qty'];
      var cartItem          = $('.cart-qty').find(`.${itemName}`);
      var cartItemPrice     = $(`.item-qty-price.${itemName}`);

      // update cart on browser
      cartItem.text(cartItemQty);
      cartItemPrice.text(String(newPrice).slice(0,5));
    }

    $('.remove-item i').on('click', function (ev) {
      $(this).parent().parent().remove();
      delete currentOrder[itemName];
    });

  });



  // var $removeItem = $('.remove-item');

  // $removeItem.on('click', 'div', function(e) {
  //   let cartItem = $(e.currentTarget).parent().attr("data-cart-item");
  //   delete currentOrder[cartItem];
  //   cartItem.remove();
  // });


  $('.reduce-item-qty').on('click', function(e) {
  let itemQty = currentOrder[itemName]['qty'];
      itemQty --;
  console.log(`UPDATED ITEM QTY`, itemQty);
  // currentOrder[itemName]['qty'] - 1;
  let someNum = $('.cart-qty').find(`.${itemName}`);
      someNum.remove();
  let update  = `<span class="cart-item__qty ${itemName}">${currentOrder[itemName]['qty']}</span>`;
  $('.cart-qty.' + itemName).append(update);

  console.log(currentOrder);
  });

});

