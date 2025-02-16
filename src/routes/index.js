const express = require('express');

const crudRoutes = require('./crud.routes.js');

const router = express.Router();

//================================================================================
// ROUTES
//================================================================================
router.use('/', crudRoutes);

module.exports = router;