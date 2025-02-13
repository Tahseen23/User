const mongoose=require('mongoose')
const Schema=mongoose.Schema

const User=new Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  },
  country:{
    type:String,
    required:true
  },
  DOB:{
    type:Date,
    required:true
  }
})

const UserModel=mongoose.model('user',User)
module.exports=UserModel