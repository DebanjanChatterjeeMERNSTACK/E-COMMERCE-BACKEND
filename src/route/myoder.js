const express = require("express")
const route = express.Router();
const Cart = require("../model/modelcart");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const validation = require("../midileware/midilware");
const ragister = require("../model/model")
const myoder = require("../model/myodermodel")

route.post("/oders", validation, (req, res) => {
    const { amount, email } = req.body

    if (email == "undefined" || email === "" || !email) {
        res.send({ mess: "login now" })
    } else if (amount === 0) {
        res.send({ mess: "please buy above RS >> 1" })
    } else {

        let instance = new Razorpay({ key_id: 'rzp_test_HGHifRB7a6gMDC', key_secret: 'us0ec70wHtyrnJlnCfvpQxgc' })

        var options = {
            amount: amount * 100,
            currency: "INR",
        };

        instance.orders.create(options, function (err, order) {
            if (err) {
                return res.send({ code: 500, mess: 'Server Err.' })
            }
            return res.send({ code: 200, mess: 'order created', data: order })
        });




    }

})






route.post("/verify", async (req, res) => {

    const { email, response, currency, amount } = req.body

    if (email) {
        ragister.findOne({ email: email }, (err, data) => {
            if (data) {
                Cart.find({ email: email }, (err, user) => {
                    if (user) {

                        let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

                        var expectedSignature = crypto.createHmac('sha256', 'us0ec70wHtyrnJlnCfvpQxgc')
                            .update(body.toString())
                            .digest('hex');

                        if (expectedSignature === response.razorpay_signature) {


                            const oder = new myoder({ email: email, address: data, oderitem: user, payment: response, price: { currency: currency, amount: amount } })

                            oder.save((err) => {
                                if (err) {
                                    res.send(err)
                                } else {
                                    Cart.deleteMany({ email: email }, (err, valid) => {
                                        if (err) {
                                            res.send(err)
                                        } else {
                                            res.send({ code: 200, mess: 'Sign Valid' });
                                        }
                                    })
                                }
                            })




                        } else {

                            res.send({ code: 500, mess: 'Sign Invalid' });
                        }


                    } else {
                        res.send({ mess: "please login " })

                    }


                })
            } else {
                res.send({ mess: "please rigester" })

            }
        })
    } else {
        res.send({ mess: "please send email" })
    }


})


route.get("/getmyoder", validation, (req, res) => {
    const email = req.headers["email"]

    if (email === "" || !email || email === "undefined") {
        res.send({ mess: "please send email id" })
    } else {
        myoder.find({ email: email }, (err, user) => {
            if (user) {
                res.send({ user: user })
            } else {
                res.send(err)
            }

        })

    }
})


module.exports = route