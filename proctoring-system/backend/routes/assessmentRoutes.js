const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/log', assessmentController.logEvent);
router.post('/forceSubmit', assessmentController.forceSubmit)

module.exports = router;