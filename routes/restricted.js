const express = require("express")
const restricted = express.Router()
const models = require("../models")

restricted.get("/restricted", function(req, res, next) {
  res.render("index", { title: "test" })
})

module.exports = restricted
