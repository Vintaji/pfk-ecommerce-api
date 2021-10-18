const sgMail = require('@sendgrid/mail')

const API_MAIL_KEY = "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";

sgMail.setApiKey(API_KEY)

const message = {
  to: 'rick_salvador@hotmail.com',
  from: {
    name: "KapiWear",
    email: "ricardo.santana@linkapi.com.br"
  },
  subject: "Hello from sendgrid",
  text: "Hello from sendgrid",
  html: "<h1>Hello from sendgrid</h1>"
};

sgMail.send(message)
  .then(response => console.log('Email sent...'))
  .catch(error => console.log(error.message));

module.exports = sgMail