import {prisma} from "../../db/prisma.js";
import jwt from "jsonwebtoken"

const otpVerify = async (req , res) => {
    const {email , otp } = req.body;

    if(!email || !otp){
        return res.status(400).json({
            message : "empty feild",
            seccuss : false
        })
    }


    try {

        const isOtp = await prisma.otp.findUnique({
            where : {
                email : email
            }
        })


        if(isOtp.otp !== otp.toString()){

            return res.status(400).json({
                message : "your otp is nont match"
            })
        }


        const otpToken = jwt.sign(
            {
                id : isOtp.id, email : email
            },
            process.env.JWT_KEY,
            {
                expiresIn : "1d"
            }
        )


        

        res.cookie("otptoken",otpToken ,
            {
                httpOnly : true,
                secure : false,
                sameSite : 'lax',
                maxAge : 360000 * 12
            }
         )

        res.status(201).json({
            message : "your otp verify please fill some datils",
            seccuss : true
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message : "server error",

        })
    }
}

export default otpVerify;