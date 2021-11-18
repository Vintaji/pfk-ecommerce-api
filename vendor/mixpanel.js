/* eslint-disable no-useless-catch */
const axios = require('axios');
require('dotenv').config();

const {baseURL, projectId, apiKey } = {
    baseURL: process.env.iNGESTION_URL,
    projectId: process.env.PROJECT_ID,
    apiKey: process.env.API_KEY,
};

const mixpanel = {
    ingestionRequest: async () => {
        const istance = axios.create ({
            baseURL: baseURL,
            params: {
                projectId: projectId,
                apiKey: apiKey,
            },
        });
    }
};

module.exports = {
    orderEvent: async (distinctId) => {
        try {
            const ingestionRequest = await mixpanel.ingestionRequest();
            const response = await ingestionRequest.post(
                '/import',
                body(distinctId, 'Order')
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    },

    topEvents: async () => {
        try {
            const queryRequest = await mixpanel.queryRequest();
            const response = await queryRequest.get('/events/top');
            return response.data;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = mixpanel;