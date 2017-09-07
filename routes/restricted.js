const express = require("express")
const restricted = express.Router()
const models = require("../models")

restricted.get("/loggedIn", (req, res) => {
  models.Activities
    .findAll({})
    .then(activities => {
      // modules.Users.findOne({})
      res.render("restricted", { activities, user: req.user })
    })
    .catch(err => {
      console.log(err)
    })
})

restricted.get("/userActivities/:activity.id", (req, res) => {
  const requestId = req.params.activity.id
  models.userActivity.findAll({ activityId: requestID }).then(activities => {
    res.render("userActivities", { activities })
  })
})

module.exports = restricted
