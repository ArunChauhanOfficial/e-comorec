import express from "express";


const userRouter = express.Router();


import CreateUser from "../../controllers/User/create.user.js"
import authMiddlewere from "../../middleware/auth.middleware/auth.middleware.js";
import userLogin from "../../controllers/User/login.user.js"


userRouter.post("/ragister", authMiddlewere, CreateUser);
userRouter.post("/login", userLogin)

export default userRouter;