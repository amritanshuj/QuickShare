const nodemailer = require('nodemailer');

async function sendMail({from, to, subject, text, html}){
    let transporter = nodemailer.createTransport("SMTP",{  
        service: "Gmail",  
        secure: false,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }

    });

    let info = await transporter.sendMail({
        from: `QuickShare<${from}>`,
        to,
        subject,
        text,
        html
    })
}


module.exports = sendMail;