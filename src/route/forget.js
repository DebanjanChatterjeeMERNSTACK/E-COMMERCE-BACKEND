const express = require("express")
const route = express.Router()
const User = require("../model/model")





route.post("/forget",async(req,res)=>{
    const {email, password}= req.body
    

     User.findOne({email:email},(err,user)=>{
        if(user){
            User.findOneAndUpdate({email:email},{password:password},(err,user)=>{
                if(user){
                    res.send({mess:"password updated"})
                }else{
                    res.send(err)

                }
            })

        }else{
          res.send ({mess:"email incorrect"})  
        }



     })

})
module.exports=route