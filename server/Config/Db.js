const mongoose = require('mongoose');

//Establish the database connection...
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`TODOLIST Successfully Connected to Mongodb Atlas Database...`.bgGreen.white);
    } catch (err) {
        console.log(`Mongo server ${err}`.bgRed.white);
        console.log(`TODOLIST Failed to connect to Database...`.bgRed.white);
    }
}

module.exports = connectDB;