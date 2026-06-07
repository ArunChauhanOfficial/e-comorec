import express from 'express'
import { adminVerify } from '../../controllers/admin/admin.verify.js';
import { adminLogin } from '../../controllers/admin/login.admin.js';
import authMiddlewere from '../../middleware/auth.middleware/auth.middleware.js';
import { phoneCreate, phoneUpdate } from '../../controllers/User/phone.user.js';
import { addressCreate, addressUpdate } from '../../controllers/User/address.user.js';

const adminRoute = express.Router()


adminRoute.post("/login", adminLogin);
adminRoute.get("/verify", authMiddlewere, adminVerify)
adminRoute.post("/numberCreate", authMiddlewere, phoneCreate)
adminRoute.patch("/numberUpdate", authMiddlewere, phoneUpdate)
adminRoute.post("/addressCreate", authMiddlewere, addressCreate)
adminRoute.patch("/addressUpdate", authMiddlewere, addressUpdate)




export default adminRoute;