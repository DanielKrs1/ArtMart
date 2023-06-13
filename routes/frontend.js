const express = require('express')
const frontend = express.frontend();
const colors = require("../colors.config.js");

frontend.get("/colors.json", (req, res) => res.json(colors).end());
frontend.get("/gallery", (req, res) => {
    res.render("gallery");
});

frontend.get("/profile", (req, res) => {
    res.render("profile", {user: {name: "Test Account"}});
});
frontend.get("/editor", (req, res) => {
    res.render("editor", { colors });
});
frontend.get("/transactions", (req, res) => {
    res.render("transactions", { transactions: [
        { senderName: "Jony", receiverName: "Teddy", artName: "nyan cat [todo link]", timeStarted: new Date(10000000000).getTime()},
        { senderName: "Charles", receiverName: "Ben", artName: "aonother cat [todo link]", timeStarted: new Date(10005000000).getTime()}
    ]});
});

module.exports = frontend