const nodemailer = require("nodemailer");

const config = {
    host: "gmail.com",
    service: "Gmail",
    auth: {
        user: "ashsnode.js@gmail.com",
        pass: "nodejs2021"
    },
    tls:{
        rejectUnauthorized: false
    },
    debug: true
}

const transporter = nodemailer.createTransport(config)

transporter.verify((err, success) => {
    if(err){
        console.log(err)
    } else{
        console.log("Connected to SMTP")
    }
})

class MailController{
    async sendMail(to, subject, text=null, html=null){
        try{
            let options = {
                to,
                subject,
                text,
                html
            }
            return await transporter.sendMail(options)
        } catch(err){
            return err.message
        }
    }
}

module.exports = new MailController()