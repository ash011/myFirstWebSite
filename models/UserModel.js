const {model, Schema} = require("mongoose")

let UserSchema = new Schema({
    username:{
        type: String
    },
    email:{
        type: String,
        email: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String
    },
    isEmailVerifyCode:{
        isVerify:{
            type: Boolean,
            default: false
        },
        code:{
            type: String
        }
    },
    image:{
        type: String,
        default: "default.png"
    }
})

let UserModel = model("user", UserSchema)

module.exports = {
    UserModel
}