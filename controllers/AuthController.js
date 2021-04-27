const {UserModel} = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const random = require("random");
const { sendMail } = require("./mailController");

class AuthController{
    async registerUser(req, res){
        try{
            let hashedPassword = bcrypt.hashSync(req.body.password)
            let newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            let mailCode = random.int(1e5, 1e6-1);
            newUser.isEmailVerifyCode.code = mailCode
            let savedUser = await newUser.save();
            let result = await sendMail(savedUser.email, "Verify your email", `Your code is ${mailCode}`)
            if(result && result.response)
            res.json({id:savedUser._id, username:savedUser.username, email:savedUser.email,emailSent:true})
            else
            res.json({id:savedUser._id, username:savedUser.username, email:savedUser.email,emailSent:false})

        
        }catch(err){
            console.log(err)
            res.json({error: err.message})
        }
    }
    async verifyEmail(req, res){
        try{
            let user = await UserModel.findOne({_id:req.body.id})
            if(!user){
                res.json({error: "No suche user"})
            } 
            if(`${req.body.code}` === `${user.isEmailVerifyCode.code}`){
                user.isEmailVerifyCode.isVerify = true
                await user.save()
                res.json({result: "done", id: user._id})
            }else{
                return res.json({error: "Code dont much"})
            }
        }catch(err){
            console.log(err)
            res.json({error: err.message})
        }
    }
}

module.exports = new AuthController()