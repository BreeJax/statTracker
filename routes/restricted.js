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

restricted.get("/userActivities/:activityId", (req, res) => {
  const activityId = req.params.activityId
  const userId = req.sessions.user
  console.log(activityId + userId + "these are the droids you are looking for")
  models.userActivity
    .findAll({ where: { activityId: activityId } })
    .then(activities => {
      console.log(activities)
      res.render("userActivities", { activities, user: req.user })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = restricted
