const express = require('express');
const router = express.Router();
const { getDashboardV2 } = require('../controllers/dashboardV2Controller');

router.get('/', getDashboardV2);

module.exports = router;