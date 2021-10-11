const payment = require('../lib/payment/juno')

const charges = async (req, res) => {
    try {
        const charges = await payment.charges();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging charges' })
    }
}

const charge = async (req, res) => {
    try {
        const charge = await payment.charge();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging charge' })
    }
}

const consultCharge = async (req, res) => {
    try {
        const consultCharge = await payment.consultCharge();
        const obj = {
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging consultCharge' })
    }
}

const cancelationCharge = async (req, res) => {
    try {
        const cancelationId = req.body.chargeId;
        const cancelation = await Juno.cancelation(cancelationId);
        res.sendStatus(cancelation);
    } catch (err) {
        return res.status(400).send({ err: 'error finging cancelationCharge' })
    }
}

module.exports = { charges, charge, cancelationCharge, consultCharge };