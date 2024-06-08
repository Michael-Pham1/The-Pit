const express = require('express');
const router = express.Router();

const User = require('../models/User')


router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newAnime = new User({ name, description });
        await newAnime.save()
        res.json(newAnime);
    } catch (err) {
        res.status(500).send('server error!');
    }
});

module.exports = router;