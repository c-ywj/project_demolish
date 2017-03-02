var twilio = require('twilio')(
  'ACca2e0d6156c76612a575e9c92900492c',
  'c21aad031e31071bce499456b1496bbf'
);



twilio.messages.create({
  to:   '+12899804890',
  from: '+16473606821',
  body: "You, good sir, are AWESOME. Have a good day."

}, function(err, message){
  //console.log("msg: ", message)
  //console.log("err: ", err)
  if(err){
    console.error(err.message);
  }
  console.log(message);
});

//console.log("In twilio.js");


twilio.calls.create({
  url: "http://twimlets.com/echo?Twiml=%3CResponse%3E%0A%3CSay%20voice%3D%22alice%22%3EHi%20there.%20You%20are%20stupid.%3C%2FSay%3E%0A%3C%2FResponse%3E&",
  to: '+16478940916',
  from: '+16473606821'
}, function(err, call){
  process.stdout.write(call.sid);
});

