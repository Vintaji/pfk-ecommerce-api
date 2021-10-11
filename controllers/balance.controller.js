const payment = require('../lib/payment/juno')

const getUserBalance = async (req, res) => {
    try {
        const balance = await payment.balance();
        const obj = {
            Saldo: balance.balance || 0
        }
        return res.send(obj)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: 'error finging balance' })
    }
}

module.exports = { getUserBalance };