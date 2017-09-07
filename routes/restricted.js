const express = require("express")
const restricted = express.Router()
const models = require("../models")

restricted.get("/loggedIn", (req, res) => {
  models.Activities
    .findAll({})
    .then(activities => {
      // modules.Users.findOne({})
      console.log(req.user)
      res.render("restricted", { activities, user: req.user })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = restricted
