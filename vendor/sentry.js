/* eslint-disable no-useless-catch */
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: 'https://4209d621707941f5b52ff0700914cc31@o1046968.ingest.sentry.io/6023966',
    tracesSampleRate: 1.0,
});

async function errorHandler(error){
    try {
        Sentry.captureException(error);
    } catch (err) {
        throw err;
    }
}

module.exports = errorHandler;