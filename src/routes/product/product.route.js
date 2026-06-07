import express from 'express'
import authMiddlewere from '../../middleware/auth.middleware/auth.middleware.js';
import { upload } from '../../service/multer.service/upload.multer.js';
import { productCreate } from '../../controllers/Product/create.product.js';
import { deleteProduct } from '../../controllers/Product/delete.product.js';
import { productUpdate } from '../../controllers/Product/update.product.js';
import { productPage } from '../../controllers/Product/list.product.js';


const productRoute = express.Router()


productRoute.post("/create", authMiddlewere, upload.single('image'), productCreate);
productRoute.delete('/delete/:id', authMiddlewere , deleteProduct)
productRoute.patch('/update/:id', authMiddlewere, upload.single('image'), productUpdate)
productRoute.get('/pagination', authMiddlewere, productPage)



export default productRoute