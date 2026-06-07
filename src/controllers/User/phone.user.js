import { prisma } from "../../db/prisma.js";


export const phoneCreate = async (req, res) => {
    const {phonenumber} = req.body;
    const id = req.token.id

    if(!phonenumber){
        return res.status(400).json({
            message : "empty fild",
            seccuss : false
        })
    }

    try {
        const isNumber = await prisma.phoneNumber.create({
            data : {
                number : phonenumber,
                userId : id
            }
        })
        if(!isNumber){
            return res.status(400).json({
                message : 'some problem in numbers',
                seccuss : false
            })
        }

         return res.status(201).json({
                message : 'number create seccussfully',
                seccuss : true
            })

    } catch (error) {
        console.log(error)
         return res.status(201).json({
                message : 'some problem in server',
                seccuss : false
            })
    }
}

export const phoneUpdate = async (req, res) => {
    const {phonenumber} = req.body;
    const id = req.token.id

    if(!phonenumber){
        return res.status(400).json({
            message : "empty fild",
            seccuss : false
        })
    }

    try {

        const isUser = await prisma.user.findUnique({
            where : {id : id},
            include : {phoneNumber : true}
        })
        const isNumber = await prisma.phoneNumber.update({
            where : {
                id : isUser.phoneNumber[0].id
            },
            data : {
                number : phonenumber,
            }
        })
        if(!isNumber){
            return res.status(400).json({
                message : 'some problem in numbers',
                seccuss : false
            })
        }

         return res.status(201).json({
                message : 'number update seccussfully',
                seccuss : true
            })

    } catch (error) {
        console.log(error)
         return res.status(400).json({
                message : 'some problem in server',
                seccuss : false
            })
    }
}

