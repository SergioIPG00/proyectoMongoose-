const User = require("../models/users.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.create= (req, res) =>{
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            bio: req.body.bio
        });

        user.save()
        .then(result => {
            const host = req.get('host');
            const protocol = req.protocol; 
            const activationUrl = `${protocol}://${host}/api/users/activate/${result._id}`;
            res.status(201).json({
                message: 'User created',
                activationUrl: activationUrl,
                user: result
            });
        })
        .catch(error => {
            res.status(400).json({ error: error.message });
        });
    });
};

module.exports.login = (req, res) =>{
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (!user.active) {
                return res.status(401).json({ message: 'Please activate your account before logging in.' });
            }
            if (err) {
                return res.status(401).json({ message: 'Auth failed' });
            }

            if (result) {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    'KEY',
                    { expiresIn: '1h' }
                );

                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }

            res.status(401).json({ message: 'Auth failed' });
        });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

module.exports.activivate = (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndUpdate(userId, { active: true }, { new: true })
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Account activated successfully' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};