const mongoose = require("mongoose")



const oderschema = new mongoose.Schema({
    email: {
        type: String
    },
    oderitem: {
        type: Array
    },
    address: {
        type: Object
    },
    payment: {
        type: Object

    },
    price: {
        amount: Number,
        currency: String
    }

})

const Oderschema = new mongoose.model("myoder", oderschema)
module.exports = Oderschema