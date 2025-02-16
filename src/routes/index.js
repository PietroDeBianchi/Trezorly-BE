const express = require('express');

const crudRoutes = require('./crud.routes.js');
const authRoutes = require('./auth.routes.js');

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