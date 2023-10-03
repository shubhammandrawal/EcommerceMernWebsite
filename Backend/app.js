const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())

// Routes
const products = require('./routes/productRoute.js') 
const users = require('./routes/userRoutes.js')
app.use('/api/v1', products)
app.use('/api', users)


//middelware for error
const errorMiddleware = require('./middlewares/error.js')
app.use(errorMiddleware)


module.exports = app;