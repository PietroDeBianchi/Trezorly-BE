const express = require('express');

const crudRoutes = require('./crudRoutes.js');
const authRoutes = require('./authRoute.js');
const groupRoute = require('./groupRoute.js');

const router = express.Router();

//================================================================================
// ROUTES
router.use('/', crudRoutes);
//================================================================================
// AUTH ROUTES
router.use('/auth', authRoutes);
//================================================================================
// GROUP ROUTES
router.use('/group', groupRoute);

module.exports = router;