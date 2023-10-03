const nodeMailer = require('nodemailer');

const sendmail = async(options) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{ 
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        to: process.env.SMPT_MAIL,
        from: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendmail;