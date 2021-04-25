const {UserModel} = require("../models/UserModel");
const bcrypt = require("bcryptjs");

class AuthController{
    async registerUser(req, res){
        try{
            let hashedPassword = bcrypt.hashSync(req.body.password)
            let newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            let savedUser = await newUser.save();
            res.json({id:savedUser._id, username:savedUser.username, email:savedUser.email})
        }catch(err){
            console.log(err)
            res.json({error: err.message})
        }
    }
}

module.exports = new AuthController()