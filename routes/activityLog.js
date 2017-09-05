const express = require("express")
const activityLog = express.Router()
const models = require("../models")

activityLog.post("/add", (req, res) => {
  const newActivity = models.Activities.build({
    activityName: req.body.activityName
  })

  newActivity
    .save()
    .then(databaseStatTracker => {
      res.redirect("/")
    })
    .catch(err => {
      console.log(err)
    })
})

activityLog.get("/list", (req, res) => {
  models.Activities
    .findAll({})
    .then(activities => {
      console.log(activities)
      res.render("activityLog", { activities })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = activityLog
