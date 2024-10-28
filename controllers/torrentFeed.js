const express = require('express');
const Router = express.Router();
const _1337FeedsProvider = require('../helpers/feed/_1337xFeed');
const nyaasiFeedsProvider = require('../helpers/feed/nyaasiFeed');

Router.get("/", async (req, res) => {
    const _1337xFeeds = await _1337FeedsProvider();
    const nyaasiFeeds = await nyaasiFeedsProvider();

    const feeds = {
        _1337xFeeds, nyaasiFeeds, lastRefreshed: Date.now()
    }

    return res.send({
        error: false,
        cached: false,
        payload: feeds
    });

})


module.exports = Router;
