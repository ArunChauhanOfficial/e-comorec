import {prisma} from "../../db/prisma.js";
import emailVlid from "../../service/email_validator/emailValid.service.js"
import otpgenerater from '../../utils/otpgenerater/otpgenrater.service.js';
import emailSener from '../../service/emailSender/emailler.service.js'



const OtpCreate = async (req , res) => {

    const {email} = req.body;
    try {



         if(!emailVlid(email)){
            return res.this.status(400).json({
                message : "email is not valid",
                seccuss :  false
            })
        }

        
       
          const isUser = await prisma.user.findUnique({
                 where : {
                            email : email
                        }
            })


             if(isUser){
                 return res.status(400).json({
                      message : "user already exist please login",
                      seccuss : false
                   })
             }

            const otp = otpgenerater();


        const isOtp = await prisma.otp.findUnique({
            where : {email : email}
        })
        

        if(isOtp){
            await prisma.otp.delete({
                where :{email : email}
            })
        }

         await prisma.otp.create({
            data : {
                email : email,
                otp : otp.toString()
            }
        })

        await emailSener({email  : email, otp : otp})


        res.status(201).json({
            message : "otp send seccuss fully please verify",
            seccuss : true
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message : "some error here please try again",
            seccuss : false
        })
    }
}

export default OtpCreate;