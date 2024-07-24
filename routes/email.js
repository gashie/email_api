const express = require('express');

const router = express.Router();

const { AccountSetupEmail, GodsEye,CustomerUpdate,OTP,StudentUpdate } = require('../controllers/Email');
//routes
router.route('/').post(AccountSetupEmail);
router.route('/birdsalert').post(GodsEye);
router.route('/csupdate').post(CustomerUpdate);
router.route('/studentupdate').post(StudentUpdate);
router.route('/otp').post(OTP);

module.exports = router;
