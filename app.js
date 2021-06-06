var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");

// init routes;

const suggestionRoute = require("./src/modules/Suggestion/suggestion.controller");
const albumRoute = require("./src/modules/Album/album.controller");
const songRoute = require("./src/modules/Song/song.controller");
const userRoute = require("./src/modules/User/user.controller");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use("/suggestions", suggestionRoute);
app.use("/albums", albumRoute);
app.use("/songs", songRoute);
app.use("/users", userRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// setup connect db

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const url =
  "mongodb+srv://my_user:myuser@cluster0.etsly.mongodb.net/Music-App?retryWrites=true&w=majority";
mongoose
  .connect(url, option)
  .then(() => console.log("Connect successfully"))
  .catch((err) => console.log(err));

module.exports = app;
