const express=require('express')
const app=express()
const bodyParser=require('body-parser')
require('dotenv').config()
const route=require('./routes/route.js')
require('./Models/db.js')

app.use(bodyParser.json())
app.use('/user',route)

app.listen(process.env.PORT,()=>{
  console.log('Server is Running')
})

