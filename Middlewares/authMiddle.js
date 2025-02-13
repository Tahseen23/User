const ErrorResponse=require('../utils/error-response.js')

const jwt=require('jsonwebtoken')
const ensure=(req,res,next)=>{
  const auth=req.headers['authorization']
  if (!auth){
    ErrorResponse.message='Unauthorized JWT'
    return res.status(401).json(ErrorResponse)
  }
  try{
    const token=auth.split(' ')[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
  }catch(err){
    ErrorResponse.message='Unauthorized JWT expired'
    return res.status(401).json(ErrorResponse)
  }
}

module.exports=ensure