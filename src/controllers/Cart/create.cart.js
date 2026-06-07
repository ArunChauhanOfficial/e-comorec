import {prisma} from '../../db/prisma.js';

export const CreateCart = async (req , res) => {
    try {
        const id = req.token.id;

        await prisma.cart.create({
            data : {
                userId : id
            }
        })

        res.status(200).json({
            message : "cart create seccessfully",
            seccuss : true
        })
    } catch (error) {
        res.status(404).json({
            message : "server probleme",
            seccuss : false
        })
    }
} 


export const UpdateCart = async (req, res) => {
    try {
        const id = 
    } catch (error) {
        res.status(400).json({
            message : "some cart is here",
            seccuss : false
        })
    }
}