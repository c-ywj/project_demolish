$(() => {

  var $orderCart    = $('.order-items');
  var $cartItems    = $('.cart-items');
  var $menuItemBox  = $('.menu-course article');
  var currentOrder  = {};
  var subtotal      = [];

  $orderCart.hide();

  $menuItemBox.on('mouseenter', function(e) {
    $(e.currentTarget).find('.menu-overlay').fadeIn(600);
  });
  $menuItemBox.on('mouseleave', function(e) {
    $(e.currentTarget).find('.menu-overlay').fadeOut(600);
  });

  // update item price in cart based on qty
  var pricePerQty = function(originalPrice, currItemPrice) {
    var price     = Math.round(parseFloat(originalPrice) * 100) / 100;

    subtotal.push(price);

    function newPrice(currItemPrice) {
      price += Math.round(parseFloat(currItemPrice) * 100) / 100;
      return Math.round(parseFloat(price) * 100) / 100;
    }

    return newPrice(currItemPrice);
  }


  var getSubtotal     = function(subtotal) {
    var finalSubtotal = 0;

    for (var i = 0; i < subtotal.length; i++) {
      finalSubtotal  += subtotal[i];
    }
    return Math.round(finalSubtotal * 100) / 100;
  }

  var getTax  = function (subtotal) {
    var total = getSubtotal(subtotal);
    var tax   = 0.13;
    return      Math.round((total * tax) * 100) / 100;
  }

  var getTotal        = function (subtotal, tax) {
    var finalSubtotal = getSubtotal(subtotal);
    return              Math.round((finalSubtotal + tax) * 100) / 100;
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
            <button type="button" class="btn btn-danger">-1</button>
          </span>
        </div>
      </li>`;

      $cartItems.append(cartItem);

      $('.sub-total').text(`$${getSubtotal(subtotal)}`);
      $('.tax').text(`$${getTax(subtotal)}`);
      $('.total').text(`$${getTotal(subtotal, getTax(subtotal))}`);

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

      $('.sub-total').text(`$${getSubtotal(subtotal)}`);
      $('.tax').text(`$${getTax(subtotal)}`);
      $('.total').text(`$${getTotal(subtotal, getTax(subtotal))}`);
    }

    $('.remove-item i').on('click', function (ev) {
      $(this).parent().parent().remove();
      delete currentOrder[itemName];
    });

  });

  $('.reduce-item-qty i').on('click', function(e) {
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


  let orderForm = $('.customer-info');

  $('.customer-info').on('submit', function(e){
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/food',
      data: orderForm.serialize()
    })
  });

  $('.modal-footer button').on('click', function(e) {
    currentOrder = {};
    subtotal = [0.00];
    $('.cart-items li').remove();
    $('.sub-total').text(`$${getSubtotal(subtotal)}.00`);
    $('.tax').text(`$${getTax(subtotal)}.00`);
    $('.total').text(`$${getTotal(subtotal, getTax(subtotal))}.00`);
    $orderCart.hide();
  })


});
