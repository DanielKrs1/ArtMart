const express = require('express')
const api = express.Router();
const db = require('../database/interface.js');
const { requiresAuth } = require('express-openid-connect');


api.get("/claim/:id", requiresAuth(), async (req, res) => {

    let [user] = await db.user.getByEmail(req.oidc.user.email);
    if (!user) {
        await db.user.create(req.oidc.user.email);
        [user] = await db.user.getByEmail(req.oidc.user.email);
    }


    await db.art.setNewOwner(parseInt(req.params.id), user.user_id);
});

api.post("/art", requiresAuth(), express.json(), async (req, res) => {
    const art = req.body;

    if (!art) return res.status(400).end();
    if (typeof art.data !== "string" || art.data.length !== 16 * 16) return res.status(400).send("bad art").end();
    if (typeof art.name !== "string" || art.name.length === 0 || art.name.length >= 45) return res.status(400).send("bad name").end();
    if (typeof art.category !== "number") {
        return res.status(400).send("bad category").end();
    }

    let [user] = await db.user.getByEmail(req.oidc.user.email);
    if (!user) {
        await db.user.create(req.oidc.user.email);
        [user] = await db.user.getByEmail(req.oidc.user.email);
    }

    art.name = art.name.replace(/>/g, '');
    art.name = art.name.replace(/</g, '');
    art.name = art.name.replace(/\\/g, '');

    // todo make sure the category id actually exists before just inserting into DB
    await db.art.create(art.data, art.category, user.user_id, art.name);

    res.write("okay!")
    return res.end();
});

module.exports = api;