const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255,
        default: "No Name",
    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 3,
        default: "No Email",
    },

    password: {
        type: String,
        required: true,
        max: 2014,
        min: 4,
        default: "No Password"
    },

    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.model('User', userSchema)
