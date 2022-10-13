const express = require("express");
const pig_router  = express.Router();

const {addAnimal} = require("../controllers/pig.controller")

pig_router.post("/addanimal", addAnimal)

module.exports= pig_router