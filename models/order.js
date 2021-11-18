const mongoose = require('../database/index');

const OrderSchema = new mongoose.Schema({
    product: {
        type: Object,
    },
    adress: {
        type: Object,
    },
    owner: {
        type: Object,
    },
    orderAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;