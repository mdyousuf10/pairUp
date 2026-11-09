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
        enum: ['Male', 'Female', 'Others', 'male', 'female', 'other']
    }

});

module.exports = mongoose.model('User', userSchema);