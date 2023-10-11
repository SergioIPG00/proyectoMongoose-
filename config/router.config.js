const express = require("express");
const router = express.Router();
const posts = require("../controller/posts.contreller")

router.get("/", (req, res) =>{
    res.json({Message: "hola mundo"})
});

router.post("/api/posts", posts.create);
router.get("/api/posts", posts.list);
router.get("/api/posts/:id", posts.detail);
router.patch("/api/posts/:id", posts.update);
router.delete("/api/posts/:id", posts.delete);

module.exports = router;