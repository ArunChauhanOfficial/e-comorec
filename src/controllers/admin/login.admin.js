import {prisma} from "../../db/prisma.js";
import bcrypt from "bcryptjs";
import jwt  from 'jsonwebtoken';


export const adminLogin = async (req , res) => {
    const {email , password} = req.body
    
    if(!email || !password){
        return  res.status(400).json(
            {
                message : "some fuild is empty",
                seccuss : false
            }
        )
    }
    try {

        const isUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        })


        if(!isUser || isUser.role !== 'ADMIN'){
            return res.status(400).json({
                message : "someting proble your and you are unauthrized",
                seccuss : false
            })
        }

        const isPasswrod = await bcrypt.compare(password, isUser.password)


        if(!isPasswrod){
            console.log(isPasswrod , "password proble")
            // console.log( await bcrypt.hash('Whoami_001', 10))
             return res.status(400).json({
                message : "someting proble your and you are unauthrized",
                seccuss : false
            })
        }

        const token = jwt.sign(
            {
                id : isUser.id,
                email ,
                role : isUser.role
            },
            process.env.JWT_KEY
        )
        
        
        res.cookie("token", token , {
            httpOnly : true,
            secure : false ,// this for only developmetn we use true
            sameSite : "lax" // this is for only development we use here strict 
        })

        return res.status(200).json({
            message : "login is seccussfully",
            seccess : true
        })
    } catch (error) {
        return res.status(400).json({
            message : `some error in : ${error}`,
            seccuss : false
        })
    }
}




