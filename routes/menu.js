"use strict";

const express = require('express');
const menuRoutes  = express.Router();

module.exports = (knex) => {

  menuRoutes.get("/", (req, res) => {
    knex
      .select("*")
      .from("item")
      .then((results) => {
        res.json(results);
      });
      .catch((err) => {
        console.error('There was an error loading the menu...')
      });
  });

  menuRoutes.post('/orders', (req, res) =>{
    console.log(req.body.name);
    console.log(req.body.phone);
    console.log(req.body.address);
    console.log(req.body.my_order);
    var array = [{name: req.body.name, phone: req.body.phone, address: req.body.address}]
    knex.insert(array).into('orders')
    .then(() =>{
      knex.select('id').from('orders').orderBy('id', 'desc').limit(1)
      .then((order_id) =>{
        // console.log("THIS IS :::", req.body.name)

        /*
          order = {
            beef: { id: 123, qty: 2 },
            chicken: { id: 234, qty: 1 }
          }
         */
        const custOrder = req.body.my_order;  // this will be our order object
        console.log("custOrder:", custOrder);
        const items = Object.keys(custOrder);    // ['beef', 'chicken']
        console.log("ITEMS:", items);
        for (let item in items) {
          const itemInfo = custOrder[item];      // { id: 123, qty: 2 }   - this is for beef
          const itemId = itemInfo.id;   // 123  - for beef     itemId
          const quantity = itemInfo.qty;  // 2  - for beef   quantity
          console.log("itemInfo:::", itemInfo);
          console.log("itemId:::", itemId);
          console.log("quantity::", quantity);
          knex.insert([{items_id: itemId, orders_id: order_id, quantity: quantity}]).into('orders_items');
        }

        // for(var i = 0; i < items.length; i++){
        //   var item_id = items[i].id;
        //   var quantity = items[i].quantity;

      })
    })
  })

  return menuRoutes;
}
