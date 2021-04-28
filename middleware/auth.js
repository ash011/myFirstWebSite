const jwt = require("jsonwebtoken");
const { TokenModel } = require("../models/TokenModel");
const { UserModel } = require("../models/UserModel");

require("dotenv").config()

const verifyToken = (req, res, next) => {
    try{
        if(req.headers["authorization"]){
            let token = req.headers["authorization"].split(" ")[1];
            if(token){
                jwt.verify(token, process.env.jwtAccessSecret, (err, decoded)=>{
                    if(err) return res.json({error: err.message});
                    req.user = {
                        id: decoded.id,
                        email: decoded.email,
                        username: decoded.username
                    }
                    next()
                })
            } else {
                res.json({error: "No Token provided"})
            }
        }else{
            res.json({error: "No autorization heder"})
        }
    }catch(err){
        console.log(err)
        res.json({error: err.message})
    }
}

const creatNewToken = (req, res) => {
    try{
        if(req.headers["authorization"]){
            let token = req.headers["authorization"].split(" ")[1];
            if(token){
                jwt.verify(token, process.env.jwtRefreshSecret, async (err, decoded)=>{
                    if(err) return res.json({error: err.message});
                    try{
                        let {tokenId} = decoded;
                        let refreshTokenOld = TokenModel.findOne({_id: tokenId});
                        
                        if(!refreshTokenOld) return res.json({error: "No such refresh token"})

                        let {userId} = refreshTokenOld;
                        let user = await UserModel.findOne({_id: userId})

                        if(!user) return res.json({error: "No such user"})

                        let {accessToken, refreshToken} = await getTokens(user);

                        res.json({user, accessToken, refreshToken})

                    }catch(err){
                        console.log(err)
                        res.json({error: err.message})
                    }
                })
            } else {
                res.json({error: "No Token provided"})
            }
        }else{
            res.json({error: "No autorization heder"})
        }
    }catch(err){
        console.log(err)
        res.json({error: err.message})
    }
}

module.exports={
    verifyToken,
    creatNewToken
}