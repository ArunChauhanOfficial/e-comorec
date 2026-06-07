import { prisma } from "../../db/prisma.js";


export const deleteProduct = async (req , res) => {
    const id = req.token.id
    const producutId = req.params.id

    console.log(producutId)
    try {
        console.log(req.token)
        const isUser = await prisma.user.findUnique({
            where : {id : id},
            include : {
                product : true
            }
        })
        
        if(isUser.role !== 'ADMIN'){
            return res.status(400).json({
                message : "your are unauthrazed",
                seccuss : false
            })
        }



        const isProduct = await prisma.product.delete({
            where : {id : Number(producutId) }
        })

       


        res.status(201).json({
            message : "product deleted seccussfully",
            seccess : true
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message : "some problem in  server"
        })
    }
}
