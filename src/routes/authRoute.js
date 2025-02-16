const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

//================================================================================
// AUTH ROUTE METHODS
//================================================================================
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware, AuthController.getMe);

module.exports = router;
