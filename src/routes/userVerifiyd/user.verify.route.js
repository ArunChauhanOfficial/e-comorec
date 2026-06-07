import express from 'express';

const verifyRoute  = express.Router();


import authMiddlewere from '../../middleware/auth.middleware/auth.middleware.js';
import { userVerify } from '../../controllers/User/verify.user.js';
import userVerifition from '../../controllers/Otp/userDelete.otp.js';


verifyRoute.get("/user", authMiddlewere  ,userVerify)
verifyRoute.post("/deleteVerify", authMiddlewere, userVerifition)


export default verifyRoute
