const express = require('express');
const Router = express.Router();
const { scrape1337x, get1337Magnet } = require('../helpers/_1337Scraper');
const nyaaSiScraper = require('../helpers/nyaaSiScraper');

Router.get('/', async (req, res) => {
    let allTorrents = []
    let { searchTerm, category } = req.query;

    let _1337xURL = category === undefined ? `https://1337x.to/search/${searchTerm}/1/` : `https://1337x.to/category-search/${searchTerm}/${category}/1/`;
    let nyaaSiURL = `https://nyaa.si/?f=0&c=0_0&q=${searchTerm}&s=seeders&o=desc`;
    const [_1337Torrents, nyaaSiTorrents] = await Promise.all([scrape1337x(_1337xURL), nyaaSiScraper(nyaaSiURL)]);
    allTorrents.push({
        site: '1337x.to',
        name: '1337x',
        torrents: _1337Torrents
    }, {
        site: 'nyaa.si',
        name: 'Nyaa.si',
        torrents: nyaaSiTorrents
    });

    if (_1337Torrents.length === 0) {
        throw new Error("No torrents found")
    }
    return res.send({
        error: false,
        cached: false,
        payload: allTorrents
    })
});

Router.get('/torrent', async (req, res) => {
    let torrents = [];
    const { url, torrentSource } = req.query;
    torrents = await get1337Magnet(url);
    return res.send({
        error: false,
        cached: false,
        payload: {
            torrents,
            actualTorrent: true,
            torrentSource
        }

    })
})


module.exports = Router;
