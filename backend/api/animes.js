const express = require('express');
const router = express.Router();

const Anime = require('../models/Anime')

router.post('/', async (req, res) => {
    const {name, description } = req.body;
    try{
        const newAnime = new Anime({ name, description});
        await newAnime.save()
        res.json(newAnime);
    } catch (err) {
        res.status(500).send('server error!');
    }
});

module.exports = router;