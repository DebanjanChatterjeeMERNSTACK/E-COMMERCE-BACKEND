const  mongoose=require("mongoose")


const userschema=new mongoose.Schema({
   
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    nearlocation:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:String
    },
    image:{
        type:String
    }
})

const Userschema=new mongoose.model("register",userschema)
module.exports=Userschema