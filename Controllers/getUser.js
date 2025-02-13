const userModel=require('../Models/User.js')
const SuccessResponse=require('../utils/success-response.js')
const ErrorResponse=require('../utils/error-response.js')
const getUser=async(req,res)=>{
  const {username}=req.query
  console.log(username)
  const user=await userModel.findOne({username})
  if (!user){
    ErrorResponse.message="No user Found"
    return res.status(404).json(ErrorResponse)
  }
  SuccessResponse.message='User Found'
  SuccessResponse.data={user}
  return res.status(200).json(SuccessResponse)
}

module.exports={getUser}