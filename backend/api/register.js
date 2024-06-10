const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    console.log("Made it to the post");
    try {
        const { name, email, uid, displayPicture, bio, created, win, lose } = req.body;

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

module.exports = router;

// router.get('/users/:uid', async (req, res) => {
//     try {
//         const { uid } = req.params;
//         const user = await User.findOne({ uid });
//         if (user) {
//             res.status(200).json({ displayPictere: user.displayPicture, name: user.name });
//         }
//     } catch (error) {
//         console.log(error.message);
//     }

// });