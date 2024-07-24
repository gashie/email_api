const express = require('express');

const router = express.Router();

const { InStitutionSetupEmail,GodsEye,CustomerUpdate,OTP } = require('../controllers/Email');
//routes
router.route('/').post(InStitutionSetupEmail);
router.route('/birdsalert').post(GodsEye);
router.route('/csupdate').post(CustomerUpdate);
router.route('/otp').post(OTP);
module.exports = router;
