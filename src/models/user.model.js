const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

userSchema.methods.getjwt = async function() {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "Yousuf@1234", { expiresIn: "7d" });
    return token;

};

userSchema.methods.validatePassword = async function(password) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema, );