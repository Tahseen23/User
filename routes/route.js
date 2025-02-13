const {signUp,login}=require('../Controllers/Auth.js')
const {getUser}=require('../Controllers/getUser.js')
const ensure=require('../Middlewares/authMiddle.js')
const check=require('../Middlewares/check.js')
const router=require('express').Router()





router.route('/login').post(login)
router.route('/signup').post(check,signUp)
router.route('/').get(ensure,getUser)

module.exports=router