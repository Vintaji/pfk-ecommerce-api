const payment = require('../vendor/juno.js');
const User = require('../models/user');
const axios = require('axios');

module.exports = {

  getUserBalance: async (req, res) => {
    try {
      const balance = await payment.balance(req.headers.resourcetoken);
      return res.status(200).send(balance)

    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  },
  
  listCharges: async (req, res) => {
    try {
      const charges = await payment.listCharges(req.headers.resourcetoken);
      return res.status(200).send(charges)

    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  },

  chargeByChargeId: async (req, res) => {
    try {
      const charge = await payment.chargeById(req.params.id, req.headers.resourcetoken);
      return res.status(200).send(charge)

    } catch (err) {
      return res.status(400).send({ message: err.message })
    }
  },

  createCharge: async (req, res) => {
    try {
      const charge = await payment.charge(req.body, req.headers.resourcetoken);
      res.status(200).send(charge)

    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  },

  cardPayment: async (req, res) => {
    try {
      const card_payment = await payment.cardPayment(req.body, req.headers.resourcetoken)
      return res.status(200).send(card_payment)

    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  },

  saveCard: async (req, res) => {
    try {
      const card_token = await payment.cardTokenize(req.body, req.headers.resourcetoken)
      return res.status(200).send(card_token)

    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  },

}