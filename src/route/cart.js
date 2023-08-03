const express = require("express")
const route = express.Router();
const Cart = require("../model/modelcart");
const validation = require("../midileware/midilware");



route.post("/cart", (req, res) => {
    const { email, id, brand, title, category, description, discountPercentage, price, rating, quentity, thumbnail } = req.body


    if (email == "undefined" || email === "" || !email) {
        res.send({ mess: "please login after you save cart" })
    } else {
        const usercart = new Cart({ email: email, id: id, brand: brand, title: title, category: category, description: description, discountPercentage: discountPercentage, price: price, rating: rating, quentity: quentity, thumbnail: thumbnail })
        usercart.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.send({ mess: "Add to cart" })
            }
        })
    }
})

route.get("/getcart", validation, (req, res) => {
    const email = req.headers["email"]

    if (email==="" || !email || email==="undefined") {
        res.send({ mess: "please send email id" })
    } else {
        Cart.find({ email: email }, (err, user) => {
            if (user) {
                res.send({ user: user })
            } else {
                res.send(err)
            }

        })

    }
})


route.post("/deletecart", (req, res) => {
    const { email, id } = req.body

    if (email && id) {
        Cart.find({ email: email }, (err, user) => {
            if (user) {
                Cart.findOneAndDelete({ id: id }, { id: id }, (err, users) => {
                    if (users) {
                        res.send({ mess: "cart deleted" })
                    } else {
                        res.send(err)
                    }

                })

            }
        })
    } else {
        res.send({ mess: "please send email id" })
    }
})
module.exports = route