const app = require('./app')
const dotenv = require('dotenv').config()
const connectDatabase = require('./database/database.js')

//connecting DB
connectDatabase()


app.listen(process.env.PORT, ()=> {
    console.log(`app is running on ${process.env.PORT}`)
})