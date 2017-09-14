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

  const activityName = models.Activities.findOne({ where: { id: activityId } })
  models.userActivity
    .findAll({ where: { activityId: activityId, userId: userId } })
    .then(userActivities => {
      res.render("userActivities", { userActivities, user: req.user, activityName })
    })
    .catch(err => {
      console.log(err)
    })
})

restricted.post("/userActivities/add", (req, res) => {
  const activityId = req.params.activityId
  const userId = req.session.passport.user
  console.log(activityId)
  const newActivity = models.userActivity.build({
    activityId: activityId,
    userId: userId,
    howMany: req.body.howMany,
    doneOn: req.body.doneOn
  })

  newActivity
    .save()
    .then(databaseUserActivities => {
      res.redirect("userActivities")
    })
    .catch(err => {
      console.log(err)
    })
})
restricted.get("/deleteAccount", (req, res) => {
  const userId = req.session.passport.user
  models.Users
    .destroy({ where: { id: userId } })
    .then(databaseUsers => {
      req.session.destroy()
      req.logOut()
      res.redirect("/")
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = restricted
