const ErrorResponse=require('../utils/error-response.js')

const check=async(req,res,next)=>{
  const {email,DOB,name,username}=req.body
  if (!email && email.includes('@')){
    ErrorResponse.message='Give Valid Email'
    return res.status(400).json(ErrorResponse)
  }
  if (isNaN(Date.parse(DOB))){
    ErrorResponse.message='Give Valid Date of Birth'
    return res.status(400).json(ErrorResponse)
  }
  if (name===username){
    ErrorResponse.message="Name and username can't be same"
    return res.status(400).json(ErrorResponse)
  }
  next()
}

module.exports=check