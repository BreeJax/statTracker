const express = require("express")
const restricted = express.Router()
const models = require("../models")

const checkIfLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect("/")
  } else {
    next()
  }
}

restricted.get("/", checkIfLoggedIn, function(req, res, next) {
  res.render("restricted")
})

module.exports = restricted
