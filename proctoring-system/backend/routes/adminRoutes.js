const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware'); // Optional

router.get('/logs', adminController.getLogs); // Optionally: , authMiddleware

module.exports = router;