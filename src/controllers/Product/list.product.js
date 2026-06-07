import {prisma} from '../../db/prisma.js'





export const productPage = async (req , res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit


    try {

        const products = await prisma.product.findMany({
                skip : skip,
                take : limit,
                orderBy : {createdAt: 'asc'}
        })
        
        const totalProducts =await prisma.product.count();


        res.status(200).json({
            success : true,
            data : products,
            pagination: {
                currentPage : page,
                totolPages: Math.ceil(totalProducts /limit),
                totolItems : totalProducts,
                itemsPerPage : limit,
                hasNextPage : page < Math.ceil(totalProducts  /limit),
                hasPrevPage : page > 1
            }
        })
    } catch (error) {
          res.status(500).json({
            success: false,
            message: error.message
        });
    }
}