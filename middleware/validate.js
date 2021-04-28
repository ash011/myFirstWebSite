let Joi = require("@hapi/joi");

let validateRegisterInfo = (req, res, next) =>{
    try{
        let Schema = Joi.object({
            username: Joi.string().min(4).max(30),
            email: Joi.string().min(3).max(100).email().required(),
            password: Joi.string().min(6).max(100).required()
        })
        let {error} = Schema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err)
        res.json({Error:err.message})
    }
}

let validateLoginInfo = (req, res, next) =>{
    try{
        let Schema = Joi.object({
            email: Joi.string().min(3).max(100).email().required(),
            password: Joi.string().min(6).max(100).required()
        })
        let {error} = Schema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err)
        res.json({Error:err.message})
    }
}

module.exports = {
    validateRegisterInfo,
    validateLoginInfo
}