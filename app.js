const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const logger = require("morgan")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const LocalStrategy = require("passport-local").Strategy
const expressSession = require("express-session")

const app = express()

// sessions!
app.use(
  expressSession({
    secret: "LoveForAll",
    resave: false,
    saveUninitialized: false
  })
)

var index = require("./routes/index")
var userLogin = require("./routes/userLogin")(app)
var restricted = require("./routes/restricted")
var activityLog = require("./routes/activityLog")

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

const checkIfLoggedIn = (req, res, next) => {
  if (!req.user) {
    res.redirect("/")
  } else {
    next()
  }
}

app.use("/", index)
app.use("/userLogin", userLogin)
app.use("/restricted", checkIfLoggedIn, restricted)
app.use("/activityLog", activityLog)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
