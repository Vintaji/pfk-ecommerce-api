const express = require('express');
const authMiddleware = require('../middlewares/auth');
const usercontroller = require('../controllers/user.controller');
const authcontroller = require('../controllers/auth.controller');
const productController = require('../controllers/products.controller');
const orderController = require('../controllers/order.controller');
const router = express.Router();
/* router.use(authMiddleware); */

const User = require('../controllers/auth.controller');
router.post('/register', authcontroller.createUser);
router.post('/login', authcontroller.authUser);

const { getUserBalance } = require('../controllers/user.controller');
router.get('/balance', getUserBalance);

const charges = require('../controllers/user.controller');
router.post('/charges', usercontroller.createCharge);
router.post('/payment_card', usercontroller.cardPayment);
router.post('/save_card', usercontroller.saveCard);
router.get('/charges', usercontroller.listCharges);
router.get('/charges/:id', usercontroller.chargeByChargeId);

const products = require('../controllers/products.controller');
router.post('/product', productController.createProduct);
router.get('/products', productController.listProduct);

const orders = require('../controllers/order.controller');
router.post('/order', orderController.createOrder);
router.get('/orders', orderController.listOrder);

module.exports = router;
