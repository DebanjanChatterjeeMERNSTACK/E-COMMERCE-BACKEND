const mongoose=require("mongoose")

 mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://debanjan:debanjan@cluster0.oilnaff.mongodb.net/user")
.then(()=>
console.log("db connected")
).catch(err=>console.log(err))