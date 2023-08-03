const express = require("express")
const route = express.Router()
const User = require("../model/model")

const jwt = require("jsonwebtoken")
const jwtkey = "e-comm"

route.post("/login", async (req, res) => {
    const { email, password } = req.body



    if (email && password) {
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                if (user.password === password) {
                    jwt.sign({ user }, jwtkey, { expiresIn: "24h" }, (err, token) => {
                        if (token) {
                            res.send({ mess: "login complete", token: token, useremail: user.email, ex: "86400" })
                        } else {
                            res.send(err)
                        }

                    })
                } else {
                    res.send({ mess: "password incorrect" })
                }
            } else {
                res.send({ mess: "please register now" })

            }
        })
    } else {
        res.send({ mess: "please fill the all filed" })
    }
})

module.exports = route