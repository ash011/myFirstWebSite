const jwt = require("jsonwebtoken");
const {TokenModel} = require("../models/TokenModel");

require("dotenv").config()

async function getTokens(user){
    try{
        let payLoad = {
            id: user._id,
            email: user.email,
            username: user.username,
            image: user.image
        }
        let accessToken = jwt.sign(payLoad, process.env.jwtAccessSecret, {expiresIn: process.env.jwtAccessSecretLT});
        let refreshTokenObj = await TokenModel.create({userId: user._id});
        let payLoadRefresh = {tokenId: refreshTokenObj._id};
        let refreshToken = jwt.sign(payLoadRefresh, process.env.jwtRefreshSecret, {expiresIn: process.env.jwtRefreshSecretLT});
    
        return { accessToken, refreshToken }
    }catch(err){
        console.log(err)
        return {error: err.message}
    }
}

module.exports = {
    getTokens
}