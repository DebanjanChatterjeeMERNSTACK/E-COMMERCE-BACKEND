const express=require("express")
const app =express()
require("../db/conn")
const cors=require("cors")
const register=require("../route/register")
const login=require("../route/login")
const forget=require("../route/forget")
const cart=require("../route/cart")
const payment=require("../route/myoder")

const port=process.env.PORT || 9000

app.use(express.json())
app.use(cors())


app.use("/upload",express.static("src/upload"))

app.use(register)
app.use(login)
app.use(forget)
app.use(cart)
app.use(payment)



app.listen(port,()=>{
    console.log("server connect")
})


