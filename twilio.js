var twilio = require('twilio')(
  'ACca2e0d6156c76612a575e9c92900492c',
  'c21aad031e31071bce499456b1496bbf'
);

var w = function generateRandNum(){
  var a = Math.floor(Math.random()*((60 - 20) + 1) + 20);
  var Q = Math.floor(Math.random()* 41 + 20);
  var c = (a + Q)/2;

//console.log("First One:" + a);
//console.log("Second One:" + Q);
console.log("Together:" + c)
return c;
}


//sms to customer

// twilio.messages.create({
//   to:   '+12899804890',
//   from: '+16473606821',
//   body: `'Hi. Thank you for ordering with Demolish. Your order will be ready in ${w()} minutes.'`

// }, function(err, message){
//   //console.log("msg: ", message)
//   //console.log("err: ", err)
//   if(err){
//     console.error(err.message);
//   }
//   console.log(message);
// });

// //console.log("In twilio.js");
// //https://www.twilio.com/labs/twimlets/echo USE THIS LINK TO ADD VOICE XML FILE
// //CALL to restaurant

// // twilio.calls.create({
// //   url: `"http://twimlets.com/echo?Twiml=%3CResponse%3E%0A%3CSay%20voice%3D%22alice%22%3EHi%20there.%20You%20are%20stupid.%3C%2FSay%3E%0A%3C%2FResponse%3E&"`,
// //   to: '+12899804890',
// //   from: '+16473606821'
// // }, function(err, call){
// //   process.stdout.write(call.sid);
// // });

// twilio.messages.create({
//   to:   '+12899804890',
//   from: '+16473606821',
//   body: `'The following order has been placed for pickup: ${req.body.currentOrder}'`

// }, function(err, message){
//   //console.log("msg: ", message)
//   //console.log("err: ", err)
//   if(err){
//     console.error(err.message);
//   }
//   console.log(message);
//   console.log(body);
// });

// // HARD CODED TWILIO:::


//   //MESSAGE TO CUSTOMER
// twilio.messages.create({
//   to:   '+12899804890',
//   from: '+16473606821',
//   body: `'Hi. Thank you for ordering with Demolish. Your order will be ready in ${w()} minutes.'`

// }, function(err, message){
//   //console.log("msg: ", message)
//   //console.log("err: ", err)
//   if(err){
//     console.error(err.message);
//   }
//   console.log(message);
// });

//   //MESSAGE TO RESTAURANT

// twilio.messages.create({
//   to:   '+12899804890',
//   from: '+16473606821',
//   body: `'The following order has been placed for pickup: 6 Pizzas, 4 Chicken Wings, 12 Fish tacos'`

// }, function(err, message){
//   //console.log("msg: ", message)
//   //console.log("err: ", err)
//   if(err){
//     console.error(err.message);
//   }
//   console.log(message);
//   console.log(body);
// });

currentOrder = {
  chicken: {
    itemId: 1,
    qty: 2
  },
  pizza: {
    itemId: 2,
    qty: 1
  },
  tacos: {
    itemId: 3,
    qty: 4
  }
}


//DYNAMIC TWILIO:::

  //MESSAGE TO CUSTOMER
twilio.messages.create({
  to:   '+12899804890',
  from: '+16473606821',
  body: `'Hi. Thank you for ordering with Demolish. Your order will be ready in ${w()} minutes.'`

}, function(err, message){
  //console.log("msg: ", message)
  //console.log("err: ", err)
  if(err){
    console.error(err.message);
  }
  console.log(message);
});




// for(var keys in currentOrder){
//   var a = keys;
//   //console.log("THE KEY", a);
//   var b = currentOrder[keys].qty;
//   //console.log(b);
//   console.log("You have received an order for " + b + " " + a);
// }

  //MESSAGE TO RESTAURANT
for(var keys in currentOrder){
  var a = keys;
  var b = currentOrder[keys].qty;
twilio.messages.create({
  to:   '+16478940916',
  from: '+16473606821',
  body: `'The following order has been placed for pickup: ${b} ${a}'`

}, function(err, message){
  //console.log("msg: ", message)
  //console.log("err: ", err)
  if(err){
    console.error(err.message);
  }
  console.log(message);
  console.log(body);
})
};























// for(var keys in currentOrder){
//   var a = currentOrder.keys;
//   var b = currentOrder.keys.qty;
//   console.log("You have received an order for " + b + a);
// }


