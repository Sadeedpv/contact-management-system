const mongoose = require("mongoose");

const DB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Successfully connected to Database`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = DB;