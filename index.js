const express = require('express');
const app = express();
const routers = require('./routes/router');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/auth.controller')(app);
require('./controllers/project.controller')(app);
require('./controllers/payment.controller');
require('./controllers/charges.controller');
require('./controllers/balance.controller');

app.use(routers);

app.listen(3001, () => {
    console.log('API Online');
});