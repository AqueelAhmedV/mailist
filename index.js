const express = require("express");
const mail = require("./api/routes/mail");
const admin = require("./api/routes/admin");
const keys = require("./config/keys");
const passport = require("passport");
const initializeServer = require('./utils/initializeServer')
const bodyParser = require('body-parser')

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://mailist-admin.vercel.app");
  res.header("Access-Control-Allow-Origin", "https://collection-ultimate.blogspot.com")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize());


// Passport config
require("./config/passport")(passport);

app.use("/api/uc/", mail);
app.use("/api/admin/", admin);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  initializeServer()
  console.log(`server running on port ${port}`);
});
