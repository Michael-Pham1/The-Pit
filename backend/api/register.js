const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    console.log("Made it to the post");
    try {
        const { name, email, uid, displayPicture, bio, created, win, lose } = req.body;
        console.log(name, email, uid, displayPicture, bio, created, win, lose);

        const userFound = await User.findOne({ uid });
        if (userFound) {
            return res.status(422).json({ error: 'User already exists!' });
        } else {
            const newUser = new User({
                name,
                email,
                uid,
                displayPicture,
                bio,
                created,
                win,
                lose
            });
            console.log("new user looks like this: ", newUser);
            const registerUser = await newUser.save();
            res.json(registerUser);

            res.status(201).json({ message: "User registered successfully!" });
        }


    } catch (error) {
        console.log("error occurred:", error.message);
    }
});


router.get('/:uid', async (req, res) => {
    try {
        const  uid  = req.params.uid;
        const user = await User.findOne({ uid: uid });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;