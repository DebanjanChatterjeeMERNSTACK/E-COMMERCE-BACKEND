const  mongoose=require("mongoose")


const cartschema=new mongoose.Schema({
    email:{
        type:String
    },
    id:{
        type:String
    },
    brand:{
        type:String
    },
    title:{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type:String
    },
    discountPercentage:{
        type:Number
    },
    price:{
        type:Number
    },
    rating:{
        type:Number
    },
    quentity:{
        type:Number
    },
    thumbnail:{
        type:String
    }
})

const Cartschema=new mongoose.model("cart",cartschema)
module.exports=Cartschema