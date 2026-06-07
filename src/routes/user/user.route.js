import express from "express";


const userRouter = express.Router();


import CreateUser from "../../controllers/User/create.user.js"
import authMiddlewere from "../../middleware/auth.middleware/auth.middleware.js";
import userLogin from "../../controllers/User/login.user.js"
import deleteMiddlewere from "../../middleware/delete.auth.middleware/delete.middleware.js";
import deleteUser from "../../controllers/User/delete.user.js";


userRouter.post("/ragister", authMiddlewere, CreateUser);
userRouter.post("/login", userLogin)
userRouter.delete("/delete", deleteMiddlewere, deleteUser)

export default userRouter;