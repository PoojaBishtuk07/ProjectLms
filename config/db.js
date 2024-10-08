
const mongoose = require ('mongoose')
const colors = require('colors')
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Mongodb connected successfully ${mongoose.connection.host}`.bgWhite.green)
    } catch(err)
    {
        console.log(`Mongodb Server Issue ${err}`.bgWhite.red)
    }
}
module.exports = connectDb;