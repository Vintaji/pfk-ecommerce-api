const express = require('express');
const authMiddleware = require('../middlewares/auth')
const usercontroller = require('../controllers/user.controller');
const authcontroller = require('../controllers/auth.controller');
const router = express.Router();

const User = require('../controllers/auth.controller');
router.post('/register', authcontroller.createUser)
router.post('/login', authcontroller.authUser)

const { getUserBalance } = require('../controllers/user.controller');
router.get('/balance', getUserBalance);

const charges = require('../controllers/user.controller');
router.post('/charge', authMiddleware, usercontroller.createCharge)
router.post('/payment_card', authMiddleware, usercontroller.cardPayment)
router.post('/save_card', authMiddleware, usercontroller.saveCard)
router.get('/charges', authMiddleware, usercontroller.listCharges)
router.get('/charges/:id', authMiddleware, usercontroller.chargeByChargeId)

module.exports = router;
