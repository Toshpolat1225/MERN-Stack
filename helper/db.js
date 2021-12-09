require("dotenv").config();
const mongoose = require('mongoose')
const URI = process.env.MONGODB_URL
module.exports = () => {
    try {
        mongoose.connect(URI, {
            //useCreateIndex: true,
            //useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error:'));
        console.log("kkkk");
        db.once('open', function () {
            console.log('MongoDB connected with global');
        });

    } catch (err) {
        throw err;
    }
}