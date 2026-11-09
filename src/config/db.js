const mongoose = require('mongoose');
const connectDB = async() => {
    await mongoose.connect('mongodb+srv://javfarooqui121_db_user:PsXz4CdledeASRai@cluster0.idqzop5.mongodb.net/')
}

module.exports = connectDB;