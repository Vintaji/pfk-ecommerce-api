const payment = require('../lib/payment/juno')

const payments = async (req, res) => {
    try {
        const payments = await payment.payments();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging payments' })
    }
}

const refund = async (req, res) => {
    try {
        const refund = await payment.refund();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging refund' })
    }
}

const capture = async (req, res) => {
    try {
        const capture = await payment.capture();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging capture' })
    }
}

module.exports = { refund, capture, payments };