const express = require("express");
const logger = require("morgan");
const db = require("./db/connection")

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// app.set("views", __dirname + "/views");
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.render("index");
// });

app.listen(PORT, () => {
    console.log(`App server listening on ${PORT}. (http://localhost:${PORT})`);
});