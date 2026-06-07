import { prisma } from "../../db/prisma.js";

export const productUpdate = async (req, res) => {
    const id = req.token.id;
    const productId = Number(req.params.id);
    console.log(req.body, "Hi")
    const { productName, productBrand, productDiscription, productPrice, stock } = req.body || {}
    const updateDATA = {};

    if (productName) updateDATA.productName = productName;
    if (productBrand) updateDATA.productBrand = productBrand;
    if (productDiscription) updateDATA.productDiscription = productDiscription;
    if (productPrice) updateDATA.productPrice = Number(productPrice);
    if (stock) updateDATA.stock = Number(stock);

    try {
        const isUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        // Issue 2: Variable name mismatch (User vs isUser)
        if (!isUser || isUser.role !== 'ADMIN') {
            return res.status(401).json({  // Issue 3: Better to use 401 for unauthorized
                message: "Unauthorized!",
                success: false  // Issue 1: Typo 'seccuss' instead of 'success'
            });
        }

        if (req.file) {
            updateDATA.productImage = req.file.path;
        }

        // Issue 4: Check if product exists before update
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            });
        }

        const isProduct = await prisma.product.update({
            where: { id: productId },
            data: updateDATA
        });

        return res.status(200).json({  // Issue 5: 201 is for creation, 200 is for update
            message: "Product updated successfully",
            success: true,
            data: isProduct  // Optional: return updated product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({  // Issue 6: 500 for server error
            message: "Product update failed",
            success: false,
            error: error.message  // Optional: send error message for debugging
        });
    }
};