const payment = require('../vendor/juno.js');
const User = require('../models/user');
const axios = require('axios');
const errorHandler = require('../vendor/sentry');

module.exports = {

    getUserBalance: async (req, res) => {
        try {
            const balance = await payment.balance(req.headers.resourcetoken);
            const obj = {
                Saldo: balance.balance || 0
            };
            return res.send(obj);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ err: 'error finging balance' });
        }
    },
  
    listCharges: async (req, res) => {
        try {
            const charges = await payment.listCharges;
            return res.status(200).send(charges);
        } catch (err) {
            return res.status(400).send({ err: 'error finging' });
        }
    },

    chargeByChargeId: async (req, res) => {
        try {
            const charge = await payment.consultCharge;
            return res.status(200).send(charge);

        } catch (err) {
            return res.status(400).send({ message: 'error finging' });
        }
    },

    createCharge: async (req, res) => {
        try {
            const charge = await payment.charge;
            res.status(200).send(charge);

        } catch (err) {
            errorHandler(err);
            return res.status(400).send({ message: 'error finging' });
        }
    },

    cardPayment: async (req, res) => {
        try {
            const card_payment = await payment.cardPayment;
            return res.status(200).send(card_payment);

        } catch (err) {
            return res.status(400).send({ message: 'error finging' });
        }
    },

    saveCard: async (req, res) => {
        try {
            const card_token = await payment.cardTokenize;
            return res.status(200).send(card_token);

        } catch (err) {
            return res.status(400).send({ message: 'error finging' });
        }
    },
};