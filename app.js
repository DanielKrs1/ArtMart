const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

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