import {prisma} from "../../db/prisma.js"



export  const userVerify = async (req ,res) => {
    const id = req.token.id;


    try {

        const isUser = await prisma.user.findUnique({
            where :{
                id : id
            }
        })

        if(!isUser){
            return res.status(400).json({
                message : "something is wrong",
                seccuss : false
            })
        }

        return res.status(201).json({
            message: "user verifyed seccussfully ",
            seccuss : true
        })
        
    } catch (error) {
        return res.status(400).json({
            message : "user is  unauthrized",
            seccuss : false
        })
    }
}