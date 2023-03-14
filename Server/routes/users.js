
const express = require("express");
const {
	UserSignup,
	 userLogin,
	 verifyToken,



} = require("../controllers/user");
const { User } = require("../models/user");
const router = express.Router();



router.post("/",UserSignup);
router.post('/login', userLogin)
router.post("/verifyToken", verifyToken);

module.exports = router;
