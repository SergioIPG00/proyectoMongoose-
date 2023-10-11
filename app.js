const express = require("express");
const app = express();

require("./config/db.config");

app.use(express.json())

const router = require("./config/router.config");
app.use(router);

app.listen(8080, ()=>{
    console.log("server is running")
})