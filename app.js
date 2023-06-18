const express = require("express");
const logger = require("morgan");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASEURL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.get("/login", (req, res) => res.redirect("/app/profile"))
app.get("/", (req, res) => {
  res.render("index");
});

const frontend = require('./routes/frontend');
const api = require("./routes/api");
app.use('/app', frontend);
app.use('/api', api);


app.listen(PORT, () => {
    console.log(`App server listening on ${PORT}. (http://localhost:${PORT})`);
});