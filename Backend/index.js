const app = require('./app')
const dotenv = require('dotenv').config()
const connectDatabase = require('./database/database.js')


//uncaught error handling
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
})

//connecting DB
connectDatabase()


 const server = app.listen(process.env.PORT, ()=> {
    console.log(`app is running on ${process.env.PORT}`)
})

// unhandled rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server")

    server.close(() => {
        process.exit(1)
    })
})