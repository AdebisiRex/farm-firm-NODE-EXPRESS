const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log("Farm Firm is now online at localhost:" + PORT);
});



const userRoute = require("./routes/user.route")
app.use("/user", userRoute);

const pig_route = require("./routes/pig.route")
app.use("/pig", pig_route);

mongoose.connect(URI, (err) => {
    console.log("Mongoose is now online");
});
