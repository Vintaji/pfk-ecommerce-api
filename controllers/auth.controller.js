const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/user');

const authConfig = process.env.authConfig
require('dotenv').config({ path: '../.env' })

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign( params, authConfig, {
        expiresIn: 86400,
    });
}

module.exports = {
    createUser: async (req, res) => {
      const { email } = req.body;
  
      try {
        if (await User.findOne({ email })) {
          return res.status(400).send({ error: "User already exists" });
        } else {
          const user = await User.create(req.body);
          //esconde o password
          user.password = undefined;
          return res.status(200).send({
            user,
            token: generateToken({ id: user.id })
          });
        }
      } catch (err) {
        return res.status(400).send({ error: "Registration failed" });
      }
    },
  
    authUser: async (req, res) => {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email }).select('+password');
        if (!user)
          return res.status(400).send({ error: "User not found" });
        if (!await bcrypt.compare(password, user.password))
          return res.status(400).send({ error: "Invalid password" });
  
        user.password = undefined
        res.send({
          user,
          token: generateToken({ id: user.id }),
        })
      } catch (e) {
        console.log(e.message || e.stack)
      }
    },
}
