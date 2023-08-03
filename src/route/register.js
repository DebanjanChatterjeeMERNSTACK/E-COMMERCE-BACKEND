const express = require("express")
const route = express.Router()
const User = require("../model/model")
const multer = require("multer")
const path = require("path")
const Cart = require("../model/modelcart");
const validation = require("../midileware/midilware")





const storage = multer.diskStorage({
    destination: 'src/upload',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },

})

const upload = multer({ storage: storage })


route.post("/register", upload.single('image'), async (req, res) => {
    const { name, email, password, phone, address, nearlocation, city, state, pincode } = req.body
    const image = `http://localhost:9000/upload/${req.file.filename}`
    const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];



    if (!(name === "") && !(email === "") && !(password === "") && !(phone === "") && !(address === "") && !(nearlocation === "") && !(city === "") && !(state === "") && !(pincode === "")) {
        if (array_of_allowed_file_types.includes(req.file.mimetype)) {


            User.findOne({ email: email }, (err, user) => {
                if (user) {
                    res.send({ mess: "email already created" })

                } else {
                    const Users = new User({ name: name, email: email, password: password, phone: phone, address: address, nearlocation: nearlocation, city: city, state: state, pincode: pincode, image: image })
                    Users.save((err) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send({ mess: 'account create ' });
                        }
                    })

                }
            })
        } else {
            res.send({ mess: "please select .png, .jpeg, .jpg, .gif" })
        }

    } else {
        res.send({ mess: "fill the all filed" })
    }

})




route.get("/registerget", validation, (req, res) => {
    const email = req.headers["email"]

    if (email === "undefined" || email === "" || !email) {
        res.send({ mess: "please login after you save cart" })
    } else {
        User.findOne({ email: email }, (err, user) => {
            if (user) {
                Cart.find({ email: email }, (err, valid) => {

                    res.send({ userimg: user.image, userlen: valid, useraddress: user.address, userphone: user.phone, uselocation: user.nearlocation, userpin: user.pincode, usercity: user.city, userstate: user.state, useremail: user.email })
                })

            }
        })
    }
})





route.post("/adderessupdate", (req, res) => {
    const { email, phone, address, nearlocation, city, pincode, state } = req.body

    if (!(email === "") && !(phone === "") && !(address === "") && !(nearlocation === "") && !(city === "") && !(state === "") && !(pincode === "")) {
        User.findOne({ email: email }, (err, valid) => {
            if (valid) {
                User.findOneAndUpdate({ email: email }, { phone: phone, address: address, nearlocation: nearlocation, city: city, state: state, pincode: pincode }, (err, valid) => {
                    if (valid) {
                        res.send({ mess: "update complete" })
                    } else {
                        res.send(err)
                    }


                })

            }else{
                res.send({ mess: "your login email id" })
            }


        })

    }
    else {
        res.send({ mess: "fill the all filed" })
    }


})



module.exports = route