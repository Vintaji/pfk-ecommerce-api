const sgMail = require('@sendgrid/mail');
require('dotenv').config({ path: '../.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
    to: 'rick_salvador@hotmail.com',
    from: {
        name: 'KapiWear',
        email: 'ricardo.santana@linkapi.com.br'
    },
    subject: 'Teste',
    text: 'Apenas testando',
    html: '<h1>Hello from sendgrid</h1>',
};

sgMail
    .send(message)
    .then((response) => console.log('Email sent...'))
    .catch((error) => console.log(error.message));