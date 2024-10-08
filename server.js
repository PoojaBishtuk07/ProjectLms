const express = require ('express')
const colors = require ('colors')
const morgan = require ('morgan')
const dotenv = require ('dotenv')
const connectDb = require ("./config/db.js")
const path = require("path")
// const cors = require("cors")
const app = express()


// app.use(cors())

// dotenv config
dotenv.config()


// mongodb connection calling
connectDb();
// calling
app.use(express.json())

// for middlewares

app.use(morgan('dev'))


// routes 
app.use('/api/v1/user', require('./routes/userRoutes.js'))

// Listen
const port = process.env.PORT ||8080

// path direction static files
app.use(express.static(path.join(__dirname, "/client/build")))
app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// listen port
app.listen(port,()=>{
    console.log(`Server running in ${process.env.NODE_MODE} Mode on port ${port}`.bgGreen)
})