const express = require('express');
const router = express.Router();

const User = require('../controllers/auth.controller');
router.get('/register', User);
router.get('/authenticate', User);

const payment = require('../controllers/payment.controller');
router.get('/payment', payment.payments);
router.get('/payment/capture/:id', payment.capture);

const { getUserBalance } = require('../controllers/balance.controller');
router.get('/balance', getUserBalance);

const charges = require('../controllers/charges.controller');
router.get('/charges', charges.charges);
router.get('/charges/:id', charges.consultCharge);
router.get('/charges/cancelation/:id', charges.cancelationCharge);
router.get('/charge', charges.charge);

module.exports = router;
