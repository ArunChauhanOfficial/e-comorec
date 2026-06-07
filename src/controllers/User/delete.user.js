import {prisma} from "../../db/prisma.js";


const deleteUser = async (req, res) => {
    const id = req.token;
    const { otp} = req.body

    try {
       
        const otps = await prisma.otp.findUnique({
            where : {
                email : id.email
            }
        })

        if(otps.otp !== otp.toString()){
            return res.status(400).json({
                message : "otp is not match",
                seccuss : false
            })
        }


        await prisma.otp.delete({
            where : {email : id.email}
        })

        await prisma.user.delete({
            where : {
                id : id.id
            }
        })

        res.status(201).json({
            message : "id deleted seccussfully",
            seccuss : false
        })
    } catch (error) {
        
    }
}

export default deleteUser;