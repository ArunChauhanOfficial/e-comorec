import nodemailer from "nodemailer";


const emailSener = async ({email , otp }) => {
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : process.env.email,
            pass : process.env.emailPass
        }
    })

    try {
        const info = await transporter.sendMail({
            from:   `Our team ${process.env.email}`,
            to : email,
            subject : `he sir /mam`,
            text : `this is your otp ${otp}`
        })
        
        
    } catch (error) {
        console.log("some problem here emaill sender", error)
    }
}

export default emailSener