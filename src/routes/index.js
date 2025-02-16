const express = require('express');

const crudRoutes = require('./crudRoutes.js');
const authRoutes = require('./authRoute.js');

const router = express.Router();

//================================================================================
// ROUTES
//================================================================================
router.use('/', crudRoutes);

//================================================================================
// AUTH ROUTES
//================================================================================
router.use('/auth', authRoutes);

module.exports = router;