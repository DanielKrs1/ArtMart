const express = require('express')
const frontend = express.Router();
const colors = require("../colors.config.js");
const db = require('../database/interface.js');
const { requiresAuth } = require('express-openid-connect');

frontend.use(requiresAuth());

frontend.get("/colors.json", (req, res) => res.json(colors).end());
let artDBCache;
let cacheTime = Date.now() - 1000000;
frontend.get("/gallery", async (req, res) => {
    if (Date.now() - cacheTime > 1_000) {
        artDBCache = await db.art.listAll();
        cacheTime = Date.now();
    }
    const arts = artDBCache;

    res.render("gallery", { arts, colors });
});

frontend.get("/profile", async (req, res) => {
    let [user] = await db.user.getByEmail(req.oidc.user.email);
    if (!user) {
        await db.user.create(req.oidc.user.email);
        [user] = await db.user.getByEmail(req.oidc.user.email);
    }
    res.render("profile", {user: {name: req.oidc.user.email}});
});
frontend.get("/editor", async (req, res) => {
    categories = await db.artCategory.list();
    res.render("editor", { colors, categories });
});
frontend.get("/view/:id", async (req, res) => {
    const [art] = await db.art.fetch(req.params.id);
    const [creator] = await db.user.fetch(art.creator_id);
    const [owner] = await db.user.fetch(art.owner_id);
    const [category] = await db.artCategory.fetch(art.category_id);
    res.render("artview", { colors, art, creator, owner, category })
})
frontend.get("/transactions", async (req, res) => {
    let [user] = await db.user.getByEmail(req.oidc.user.email);
    if (!user) {
        await db.user.create(req.oidc.user.email);
        [user] = await db.user.getByEmail(req.oidc.user.email);
    }
    const transactions = await db.transactions.listByUser(user.user_id);
    for (const t of transactions) {
        t.from_user = (await db.user.fetch(t.user_from_id))[0];
        t.to_user = (await db.user.fetch(t.user_to_id))[0];
        t.art = (await db.art.fetch(t.art_id))[0];
    }
    res.render("transactions", { transactions });
});

module.exports = frontend