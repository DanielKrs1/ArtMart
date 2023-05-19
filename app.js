const express = require("express");
const logger = require("morgan");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// remove on oauth
app.get("/login", (req, res) => res.redirect("/app/profile"))

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/app/gallery", (req, res) => {
    res.render("gallery");
});
app.get("/app/profile", (req, res) => {
    res.render("profile", {user: {name: "Test Account"}});
});
app.get("/app/editor", (req, res) => {
    res.render("editor");
});
app.get("/app/transactions", (req, res) => {
    res.render("transactions", { transactions: [
        { senderName: "Jony", receiverName: "Teddy", artName: "nyan cat [todo link]", timeStarted: new Date(10000000000).getTime()},
        { senderName: "Charles", receiverName: "Ben", artName: "aonother cat [todo link]", timeStarted: new Date(10005000000).getTime()}
    ]});
});

app.listen(PORT, () => {
    console.log(`App server listening on ${PORT}. (http://localhost:${PORT})`);
});