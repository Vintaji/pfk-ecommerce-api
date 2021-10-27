const mongoose = require('../database/index');
const bcrypt = require ('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    size: {    
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,   
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;