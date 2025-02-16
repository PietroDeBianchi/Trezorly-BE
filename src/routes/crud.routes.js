const express = require('express');

const router = express.Router();

const crudCtrl = require('../controllers/CrudController.js');

//================================================================================
// GENERIC ROUTE METHODS
//================================================================================
router.get('/', crudCtrl.getCrudObjects);


module.exports = router;