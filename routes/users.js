"use strict";

const express = require('express');
const userRoutes  = express.Router();

module.exports = (knex) => {

  userRoutes.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  userRoutes.post("/", (req, res) => {
    knex
      
  });

  return userRoutes;
}
