const mongoose = require('mongoose')

const connectDatabase = () => { mongoose.connect(process.env.MONGO_URI, {family: 4}).then(()=>{
    console.log("mongodb connected successfully ");
}).catch(()=>{
    console.log("Failed to connect to database of mongodb");
});
}

module.exports = connectDatabase