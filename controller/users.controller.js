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
            res.status(201).json({
                message: 'User created',
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
            if (err) {
                return res.status(401).json({ message: 'Auth failed' });
            }

            if (result) {
                const token = jwt.sign(
                    { email: user.email, userId: user._id },
                    'KEY', // Asegúrate de usar una llave secreta segura y preferiblemente almacenada en variables de entorno
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
