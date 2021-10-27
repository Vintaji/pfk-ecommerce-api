const mongoose = require('../database/index');
const bcrypt = require ('bcryptjs');

const TshirtSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {    
        type: String,
        unique: true,
        required: true,
        lowercase: true,   
    },
    password: {
        type: String,
        required: true,
        select: false,        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    adress: {
        type: Object,
    },
    phone: {
        type: String,
    },
    cardHash: {
        type: String,  
    },
});

TshirtSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', TshirtSchema);

module.exports = User;