import {prisma} from "../../db/prisma.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userLogin = async (req , res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            message : "your input fiuld is empty",
            seccuss : false
        })
    }


    try {
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })


        if(!user){
            return res.status(400).json({
                message : "you are authrised please try again and go ragister",
                seccess : false
            })
        }


        const isPasswrod = await bcrypt.compare(password , user.password)


        if(!isPasswrod){
            return res.status(400).json({
                message : "you are authrised please try again ",
                seccess : false
            })
        }

        const token = jwt.sign(
            {
                id : user.id,
                email : user.email
            },
            process.env.JWT_KEY
        )

        res.cookie("token", token, {
            httpOnly : true,
            secure : false,
            sameSite : "lax", //strict 
        })


        return res.status(200).json({
            message : "login seccussfully ",
            seccuss : true
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            message : "some mising in server please try again",
            seccuss :  false
        })
    }
}


export default userLogin