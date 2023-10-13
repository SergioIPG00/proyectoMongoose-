const express = require("express");
const router = express.Router();
const posts = require("../controller/posts.contreller");
const users = require("../controller/users.controller");

router.get("/", (req, res) =>{
    res.json({Message: "hola mundo"})
});

router.post("/api/posts", posts.create);
router.get("/api/posts", posts.list);
router.get("/api/posts/:id", posts.detail);
router.patch("/api/posts/:id", posts.update);
router.delete("/api/posts/:id", posts.delete);
router.post("/api/users", users.create);
router.post("/api/login", users.login);

module.exports = router;