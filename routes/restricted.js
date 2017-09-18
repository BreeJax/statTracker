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

  models.Activities.findOne({ where: { id: activityId } }).then(activity => {
    models.userActivity
      .findAll({ where: { activityId: activityId, userId: userId } })
      .then(userActivities => {
        console.log(userActivities)
        const data = { userActivities, user: req.user, activity }
        res.render("userActivities", data)
      })
      .catch(err => {
        console.log(err)
      })
  })
})

restricted.get("/userActivities/edit/:userActivityId", (req, res) => {
  const id = req.params.userActivityId

  models.userActivity.findOne({ where: { id: id } }).then(editThis => {
    console.log(editThis)
    res.render("edit", { editThis })
  })
})

restricted.post("/userActivities/add", (req, res) => {
  const activityId = req.body.activityId
  const userId = req.session.passport.user
  console.log(activityId)
  const newActivity = models.userActivity.build({
    activityId: activityId,
    userId: userId,
    howMany: req.body.howMany,
    doneOn: req.body.doneOn
  })
  console.log(newActivity)
  newActivity
    .save()
    .then(databaseUserActivities => {
      res.redirect(activityId)
    })
    .catch(err => {
      console.log(err)
      res.json(err)
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
