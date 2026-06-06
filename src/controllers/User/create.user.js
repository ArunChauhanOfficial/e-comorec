import {prisma} from "../../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const CreateUser = async (req , res) => {
    const {name  , password} = req.body;
    const otpId  = req.token.id;

    if(!name || !otpId || !password){
         return res.status(400).json({
            message : "fiels is empy",
            seccuss : false
         })
    }

    try {
     const isUser = await prisma.user.findUnique({
      where : {
         email : isOtp.email
      }
   })


   if(isUser){
       return res.status(400).json({
            message : "user already exist please login",
            seccuss : false
         })
   }

    const isOtp = await prisma.otp.findUnique({
      where : {
         id : otpId
      }
   })


   
   if(!isOtp){
      return res.status(400).json({
         message : "something is problem is server",
         seccuss : false
      })
   }
        
   

   const encryptPassword = await bcrypt.hash(password, 10)

  
    const user = await prisma.user.create({
      data : {
           name : name,
            email : isOtp.email,
            password : encryptPassword
      }
   })


   await prisma.otp.delete({
      where : {
         email : isOtp.email
      }
   })
   

   const token = jwt.sign(
      {
         id : user.id, email : user.email
      },
      process.env.JST_KEY
   )

   res.cookie("token", token, 
      {
         httpOnly : true,
         secure : false,
         sameStie : "lax",
      }
   )

   res.status(201).json({
      message : "ragister seccussfully",
      seccuss : true
   })
        
    } catch (error) {
         console.log(error.message)
         return res.status(400).json({
            message : "some proble in server please try again",
            seccuss : false
         })
    }
}


export default CreateUser;