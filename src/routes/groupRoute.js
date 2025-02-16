const express = require("express");

const router = express.Router();

const groupController = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

//================================================================================
// GROUP ROUTE METHODS
//================================================================================
router.post("/createGroup", authMiddleware, groupController.createGroup);


module.exports = router;
