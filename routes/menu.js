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
  });

  return menuRoutes;
}
