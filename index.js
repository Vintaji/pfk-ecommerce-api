const express = require('express');
const app = express();
const routers = require('./routes/router');
const morgan = require('morgan');

app.use(morgan('dev'));
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/auth.controller');
require('./controllers/user.controller');
require('./controllers/products.controller');
require('./controllers/order.controller');

app.use(routers);

app.use((req, res, next) => {
    const error = new Error('Esse endpoint não foi encontrado');
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    const error = new Error('Seu token está invalido');
    error.status = 401;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send ({
        error: {
            mensagem: error.message
        }
    });
});

app.listen(3001, () => {
    console.log('API Online');
});