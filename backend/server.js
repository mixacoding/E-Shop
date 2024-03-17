require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./index");

const DB_URL = process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD);

mongoose
    .connect(DB_URL)
    .then((data) => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    })

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if(err) console.log(err,"Error in server setup");
    else console.log("Server listening on port", port);
});