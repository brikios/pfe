import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    service: 'hotmail',
  auth: {
    user: 'mouadh.briki@hotmail.com',
    pass: 'med99210046',
    authentication: 'PLAIN'
  }
})

export const sendConfirmationEmail=async(email,confirmationCode)=>{
    const mailOptions = {
        from :'mouadh.briki@hotmail.com',
        to : email,
        subject : 'Account Confirmation',
        text : `Your confirmation code is: ${confirmationCode}`
    }
    await transporter.sendMail(mailOptions)
}