const Posts = require("../models/posts.model");
const jwt = require('jsonwebtoken');

module.exports.create = (req, res) =>{

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.userData = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    console.log(req.body);
    Posts.create(req.body)
    .then((post) => {
        res.status(201).json(post);
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

module.exports.list = (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.userData = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    Posts.find({})
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

module.exports.detail = (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.userData = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    Posts.findById(req.params.id)
    .then(post => {
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

module.exports.update = (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.userData = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    Posts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(post => {
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

module.exports.delete = (req, res) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.userData = decodedToken;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
    Posts.findByIdAndDelete(req.params.id)
    .then(post => {
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(204).send();
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};