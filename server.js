"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
// const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const menuRoutes  = require("./routes/menu");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/styles", sass({
//   src: __dirname + "/styles",
//   dest: __dirname + "/public/styles",
//   debug: true,
//   outputStyle: 'expanded'
// }));
app.use(express.static("public"));

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

var currentOrder = {
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


// Mount all resource routes
// app.use("/api/users", usersRoutes(knex));
app.use("/menu", menuRoutes(knex));
// app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/food", (req, res) =>{
  twilio.messages.create({
  // to:   '+12899804890',
  to: `+12899804890`,
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
  to:   `+16478940916`,
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

// res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});