const {signUp,login}=require('../Controllers/Auth.js')
const router=require('express').Router()





router.route('/login').post(login)
router.route('/signup').post(signUp)

module.exports=router