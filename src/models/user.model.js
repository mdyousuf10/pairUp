const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        Maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        Maxlength: 30
    },
    emailid: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others']
    }

});

module.exports = mongoose.model('User', userSchema);