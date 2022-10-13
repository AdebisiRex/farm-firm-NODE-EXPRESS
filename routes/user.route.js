const express = require("express");
const router  = express.Router()
const {registerUser,signin}= require ("../controllers/user.controller")

router.post("/register", registerUser)
router.post("/signin", signin)

module.exports = router