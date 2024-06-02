const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.post('/', async (req, res) => {
    const {username, email, password } = req.body;
    try{
        const newUser = new User({ username, email, password});
        await newUser.save()
        res.json(newuser);
    } catch (err) {
        res.status(500).send('server error!');
    }
});

module.exports = router;