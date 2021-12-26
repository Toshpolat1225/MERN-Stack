const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "Bunday email bor"})
            if(password.length < 6)
                return res.status(400).json({msg: "Paroliz juda sodda 6 dan kop belgidan foydalaning"})
           
            // Password Encryption Hesh
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name, email, password: passwordHash,
            })
            // Save MongoDB
            await newUser.save()
            // Then create jsonwebtoken to authentication
            const accesstoken = createAccesstoken({id: newUser.id})
            const refreshtoken = createRefreshtoken({id: newUser.id})
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token"
            })
            res.json({accesstoken , msg: "Registerdan o'tindingiz"})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body 
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "Bunday foydalanuvchi yo'q"})
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Parol nato'g'ri"})
            // if login success, create access token and refresh token
            const accesstoken = createAccesstoken({id: user.id})
            const refreshtoken = createRefreshtoken({id: user.id})
            res.cookie("refreshtoken", refreshtoken, {
                httpOnly: true,
                path: "/user/refresh_token"
            })
            res.json({accesstoken, msg: "Logindan o'tindingiz"})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", {path: "/user/refresh_token"})
            return res.json({msg: "Chiqishdan o'tindingiz"})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    refreshToken:(req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Iltimos Akkountizga o'ting"})
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
                if(err) return res.status(400).json({msg: "Iltimos Akkountizga o'ting"})
                const accesstoken = createAccesstoken({id: user.id})

                //res.json({user, accesstoken})

            })
            res.json({rf_token})
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    }
}
const createAccesstoken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"})
}
const createRefreshtoken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
}

module.exports = userCtrl