import express from 'express';

const verifyRoute  = express.Router();


import authMiddlewere from '../../middleware/auth.middleware/auth.middleware.js';
import { userVerify } from '../../controllers/User/verify.user.js';


verifyRoute.get("/user", authMiddlewere  ,userVerify)


export default verifyRoute
