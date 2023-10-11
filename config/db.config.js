const mongoose = require("mongoose");
const mongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

mongoMemoryServer.create()
    .then((mogsoServer) =>{
        return mongoose.connect(mogsoServer.getUri(), {
            useNewUrlParser: true,
            dbName: "posts",
            useUnifiedTopology: true
        });
    })
    .then(() => console.info("conectado"))
    .catch((err) =>{
        console.log(err);
    });