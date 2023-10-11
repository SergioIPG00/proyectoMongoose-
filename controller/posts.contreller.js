const Posts = require("../models/posts.model");

module.exports.create = (req, res) =>{
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
    Posts.find({})
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

module.exports.detail = (req, res) =>{
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