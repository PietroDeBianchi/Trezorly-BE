const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");

//================================================================================
// AUTH ROUTE METHODS
//================================================================================
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", AuthController.getMe);

module.exports = router;
