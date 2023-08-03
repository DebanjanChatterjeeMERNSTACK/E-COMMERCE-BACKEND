const jwt = require("jsonwebtoken")
const jwtkey = "e-comm";

const validation =(req,res,next)=>{
 const token =req.headers["auth"]
 if(token){
    jwt.verify(token,jwtkey,(err,valid)=>{
        if(valid){
            next()
        }else{
            res.send({mess:"please login after you save cart"})
        }
    })
 }else{
    res.send({mess:"please login after you save cart"})
 }
}
module.exports=validation