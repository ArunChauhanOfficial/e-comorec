import {prisma} from "../../db/prisma.js";
import jwt from "jsonwebtoken";



const authMiddlewere = async (req , res ,next) =>{
     const token =  req.cookies?.otptoken || req.cookies.token

   
    if (!token && req.headers.authorization) {
            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            } else {
                token = req.headers.authorization;
            }
        }

    try {


    const tokenVerifaction = jwt.verify(token, process.env.JWT_KEY)

    if(!tokenVerifaction){
        console.log(tokenVerifaction , "  this is problae")
        return res.status(400).json({
            message : "some problem in server and otp verify angain",
            seccuss : false
        })
    }



    req.token = tokenVerifaction;


    next()
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            message : "some problem in server and otp verify angain and other",
            seccuss : false
        })
    }
}

export default authMiddlewere;