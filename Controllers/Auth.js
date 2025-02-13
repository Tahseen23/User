const userModel=require('../Models/User.js')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const SuccessResponse=require('../utils/success-response.js')
const ErrorResponse=require('../utils/error-response.js')



const signUp=async(req,res)=>{
  try{
    const {name,username,DOB,password,country,email}=req.body
    const user=await userModel.findOne({username})
    if (user){
      ErrorResponse.message='Username must be unique'
      return res.status(409).json(ErrorResponse)
    }
    const newUser=new userModel({name,DOB,username,password,country,email})
    newUser.password=await bcrypt.hash(password,10)
    await newUser.save()
    SuccessResponse.message='User created successfully'
    return res.status(201).json(SuccessResponse)

  }catch(err){
    ErrorResponse.message='Something happend in user creation'
    ErrorResponse.error=err
    return res.status(400).json(ErrorResponse)
  }
}


const login=async(req,res)=>{
  try{
    const {username,password}=req.body
    const user=await userModel.findOne({username})
    if (!user){
      ErrorResponse.message='Username not Found'
      return res.status(404).json(ErrorResponse)
    }
    const isEqual=await bcrypt.compare(password,user.password)
    if (!isEqual){
      ErrorResponse.message='Password is Incorrect'
      return res.status(401).json(ErrorResponse)
    }
    const jwtToken = jwt.sign({ email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    SuccessResponse.message='LogIn successfully'
    SuccessResponse.data={token:jwtToken}
    return res.status(201).json(SuccessResponse)

  }catch(err){
    ErrorResponse.message='Something happend in user Login'
    ErrorResponse.error=err
    return res.status(400).json(ErrorResponse)
  }
}

module.exports={
  signUp,login
}