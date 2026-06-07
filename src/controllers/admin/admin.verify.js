import {prisma} from "../../db/prisma.js"



export  const adminVerify = async (req ,res) => {
    const id = req.token.id;


    try {

        const isUser = await prisma.user.findUnique({
            where :{
                id : id
            }
        })

        if(!isUser || isUser.role !== 'ADMIN'){
            return res.status(400).json({
                message : "something is wrong",
                seccuss : false
            })
        }

        res.status(201).json({
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