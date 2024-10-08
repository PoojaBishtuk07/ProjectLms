const mongoose = require("mongoose")

const userUpdateSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:[true, "first name is required"]
}

})
const UserUpdateModel = mongoose.model("users", userUpdateSchema)
module.exports = UserUpdateModel