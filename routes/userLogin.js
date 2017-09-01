const express = require("express")
const userLogin = express.Router()
const models = require("../models")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

/* GET users listing. */
passport.use(
  "login",
  new LocalStrategy((username, password, next) => {
    models.Users
      .findOne({ where: { username } })
      .then(user => {
        if (bcrypt.compareSync(password, user.passwordHash)) {
          return next(null, { username: user.username, id: user.id })
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
  new LocalStrategy((username, password, next) => {
    let data = {
      name: name,
      username: username,
      password: password
    }
    // create a user
    models.Users
      .build(data)
      .save()
      .then(user => {
        // save to database
        return next(null, user)
      })
      .catch(err => next(err))
  })
)
passport.serializeUser((user, next) => {
  next(null, user.id)
})
passport.deserializeUser(function(id, next) {
  models.User
    .findOne({
      where: {
        id: id
      }
    })
    .then(user => {
      next(null, { username: user.username, id: user.id })
    })
})
userLogin.use(passport.initialize())
userLogin.use(passport.session())

userLogin.get("/", (req, res) => {
  res.send("respond with a resource")
})
userLogin.post(
  "/",
  passport.authenticate("login", {
    successRedirect: "/restricted",
    failureRedirect: "/"
  })
)
userLogin.post(
  "/register",
  passport.authenticate("signup", {
    successRedirect: "/restricted",
    failureRedirect: "/"
  })
)
userLogin.get("/logout", (req, res) => {
  req.session.destroy()
  req.logOut()
  res.redirect("/")
})

module.exports = userLogin
