const mongoose = require('mongoose')

const connectDatabase = () => { mongoose.connect(process.env.MONGO_URI, {family: 4}).then(()=>{
    console.log("mongodb connected successfully ");
})
}

module.exports = connectDatabase