import {prisma} from "../../db/prisma.js"


export const productCreate = async (req, res) => {
    const {
        productName ,
        productBrand,
        productDiscription,
        productPrice,
        stock
    } = req.body
    const productImage = req.file.path;
    const id = req.token.id

   

    if(!productName || !productBrand || !productDiscription || !productPrice || !stock){
        return res.status(400).json({
            message : "some fiuld is empty",
            seccuss : false
        })
    }

    try {

        const isUser = await prisma.user.findUnique({
            where : {id : id}
        })


        if(isUser.role !== 'ADMIN'){
             return res.status(400).json({
                 message : "unauthrised",
                 seccuss : false
             })
        }
        

        const isProduct = await prisma.product.create({
            data : {
                productName,
                productBrand,
                productDiscription,
                productPrice : Number(productPrice),
                productImage,
                stock : Number(stock),
                userId : id
            }
        })
        

        console.log(isProduct)

        if(!isProduct){
            return res.status(400).json({
                message : "some problem ",
                seccuss : false
            })
        }

        return res.status(201).json({
            message : "product create success fully",
            seccess : true
        })
    } catch (error) {
        console.log(error , "this is error")
         return res.status(400).json({
            message : "some problem in server",
            seccuss : false
        })
    }
} 