/* eslint-disable no-useless-catch */
const axios = require('axios');
const juno = axios;
require('dotenv').config();

const config = {
    baseUrlAuth: process.env.baseUrlAuth,
    baseUrl: process.env.baseUrl,
    path: 'oauth/token',
    id: process.env.id,
    secret: process.env.secret,
    resourceToken: process.env.resourceToken,
    acessToken: process.env.acessToken
};

const payment = {

    initAuth: async () => {

        const encoded = Buffer.from(`${config.id}:${config.secret}`).toString('base64');

        const instance = juno.create({
            baseURL: config.baseUrlAuth,
            headers: {
                'Authorization': `Basic ${encoded}`
            }
        });

        return instance;

    },

    init: async () => {

        const token = await payment.getToken();

        const instance = juno.create({
            baseURL: config.baseUrl,
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Api-Version': '2',
                'X-Resource-Token': config.resourceToken
            }
        });

        return instance;

    },

    getToken: async () => {

        try {

            const instance = await payment.initAuth();

            let params = new URLSearchParams();
            params.append('grant_type', 'client_credentials');

            const res = await instance.post(config.path, params);

            return res.data.access_token;

        } catch(err) {
            throw err;
        }

    },

    balance: async () => {

        try {
            
            const instance = await payment.init();
            const res = await instance.get('balance');
            return res.data;

        } catch(err) {
            throw err;
        }

    },

    tokenization: async (obj) => {

        try {
            
            const instance = await payment.init();
            const res = await instance.post('credit-cards/tokenization', obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res;

        } catch(err) {
            throw err;
        }

    },

    charge: async (obj) => {

        try {
            
            const instance = await payment.init();
            const res = await instance.post('charges', obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res.data._embedded.charges[0];

        } catch(err) {
            throw err;
        }

    },

    cancelationCharge: async (obj) => {

        try {
            
            const instance = await payment.init();
            const res = await instance.post('/charges/{id}/cancelation', obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res.data._embedded.charges[0];

        } catch(err) {
            throw err;
        }

    },

    consultCharge: async (obj) => {

        try {
            
            const instance = await payment.init();
            const res = await instance.post('/charges/{id}', obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res.data._embedded.charges[0];

        } catch(err) {
            throw err;
        }

    },

    payments: async (obj) => {

        try {
            
            const instance = await payment.init();
            const res = await instance.post('payments', obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res.data.payments[0];

        } catch(err) {
            throw err;
        }

    },

    refund: async (id, amount = null) => {

        try {

            const obj = {
                amount
            };
            
            const instance = await payment.init();
            const res = await instance.post(`payments/${id}/refunds`, obj, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .catch(e => {
                    console.log(e.response.data);
                });

            return res.data;

        } catch(err) {
            throw err;
        }

    }

};

module.exports = payment;
