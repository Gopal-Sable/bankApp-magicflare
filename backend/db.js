const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/bankapp?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoURI = "mongodb+srv://gopal:sable123@cluster0.yvjs1.mongodb.net/bankapp?retryWrites=true&w=majority"
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected");
    })
}

module.exports = connectToMongo;