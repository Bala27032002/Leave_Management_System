const express = require('express');
const router = express.Router();
const LeaveApplyContrller = require('..//Controller/LeaveApplyContrller');

// Sign-up route
router.post('/apply', LeaveApplyContrller.CreateLeave);
router.get('/apply', LeaveApplyContrller.getLeave);
router.put('/update-status/:id', LeaveApplyContrller.updateLeaveStatus);
module.exports = router;
