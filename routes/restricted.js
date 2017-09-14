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
  const userId = req.session.passport.user
  models.userActivity
    .findAll({ where: { activityId: activityId, userId: userId } })
    .then(userActivities => {
      console.log(userActivities)
      res.render("userActivities", { userActivities, user: req.user })
    })
    .catch(err => {
      console.log(err)
    })
})

restricted.post("/userActivities/:activityId/new", (req, res) => {
  const activityId = req.params.activityId
  const userId = req.session.passport.user
  const newActivity = models.userActivity.build({
    activityId: activityId,
    userId: userId,
    howMany: req.body.howMany,
    doneOn: req.body.doneOn
  })

  newActivity
    .save()
    .then(databaseUserActivities => {
      res.render("userActivities")
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = restricted
