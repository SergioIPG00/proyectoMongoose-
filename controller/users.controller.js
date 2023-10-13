const Posts = require("../models/users.model");

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
}