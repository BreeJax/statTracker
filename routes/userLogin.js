const express = require("express")
const userLogin = express.Router()
const models = require("../models")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

/* GET users listing. */
passport.use(
  "login",
  new LocalStrategy((username, password, next) => {
    models.Users
      .findOne({ where: { username } })
      .then(user => {
        if (bcrypt.compareSync(password, user.passwordHash)) {
          return next(null, { name: user.name, username: user.username, id: user.id })
        } else {
          return next(null, false, { message: "Noooooope" })
        }
      })
      .catch(err => {
        return next(err)
      })
  })
)
passport.use(
  "signup",
  new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
    console.log({ req, username, password, next })
    let data = {
      username: username,
      password: password,
      name: req.body.name
    }
    // create a user
    models.Users
      .build(data)
      .save()
      .then(user => {
        // save to database
        return next(null, { name: user.name, username: user.username, id: user.id })
      })
      .catch(err => next(err))
  })
)
passport.serializeUser((user, next) => {
  next(null, user.id)
})
passport.deserializeUser(function(id, next) {
  models.Users
    .findOne({
      where: {
        id: id
      }
    })
    .then(user => {
      next(null, { name: user.name, username: user.username, id: user.id })
    })
})

module.exports = function(app) {
  app.use(passport.initialize())
  app.use(passport.session())

  userLogin.get("/", (req, res) => {
    res.send("respond with a resource")
  })
  userLogin.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/restricted/loggedIn",
      failureRedirect: "/"
    })
  )
  userLogin.post(
    "/register",
    passport.authenticate("signup", {
      successRedirect: "/restricted/loggedIn",
      failureRedirect: "/"
    })
  )
  userLogin.get("/logout", (req, res) => {
    req.session.destroy()
    req.logOut()
    res.redirect("/")
  })

  return userLogin
}
