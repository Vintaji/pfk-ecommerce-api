const express = require('express');
const authMiddleware = require('../middlewares/auth.js');
const order = require('../models/order');
const router = express.Router();
router.use(authMiddleware);

module.exports = {
    createOrder: async (req, res) => {
        const Orders = await order.create(req.body);
        return res.status(200).send ({
            Orders,
        });
    },
    listOrder: async (req, res) => {
        const orders = await order.find();
        const obj = {
            Pedidos: orders.reverse()
        };
        return res.send(obj);
    },
};