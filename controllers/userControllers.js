const userModel  = require('../models/UserModels.js')

const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

// resister callback
const registerController = async(req, res)=>
{
try{
      const existingUser = await userModel.findOne({email: req.body.email})
   if(existingUser)
   {
    return res.status(200).send({message: "User Already exist" , success: false })
   }
   const password = req.body.password;
   const salt= await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt)
   req.body.password = hashedPassword
   const newUser = new userModel(req.body)
   await newUser.save();
   res.status(201).send({message:"Register Successfully", success: true})
} catch(error)
{
    console.log(error)
    res.status(500).send({
        success:false,
        message:`Register controller ${error.message}`
    })
}
}
// login callback
 const loginController = async (req,res)=>{

   try{

const user = await userModel.findOne({email:req.body.email})
if(!user){
    return res.status(200).send({message: 'user not found', success:false})
}
const isMatch = await bcrypt.compare(req.body.password, user.password)
if(!isMatch){
    return res.status(200).send({message:'invalid email or password', success:false})
}
const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'1d',})
res.status(200).send({message:"login success", success:true, token})
   }
   catch(error){
console.log(error)
res.status(500).send({message: `Error in Login CTRL ${error.message}`})
   }
}

const authController = async(req, res)=>{
try{
const user = await userModel.findOne({_id:req.body.userId})
if(!user)
{
    return res.status(200).send(
        {
        message:"user not found",
        success:false
    })
} else
 {
    res.status(200).send({
        success:true,
        data : {
            name:user.name,
            email:user.email,
        }
    })
 }
}
catch(error){
console.log(error)
res.status(500).send({message: `Error in Login CTRL ${error.message}`})
   }
}

module.exports ={loginController, registerController, authController}