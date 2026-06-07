import express from "express";
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express();

import otpRoute from "./routes/otp/otp.route.js"
import userRoute from "./routes/user/user.route.js";
import verifyRoute from "./routes/userVerifiyd/user.verify.route.js";
import adminRoute from "./routes/admin/admin.route.js";
import productRoute from "./routes/product/product.route.js";


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:58962",
    credentials : true
}))

app.use("/api/otp", otpRoute);
app.use("/api/user", userRoute)
app.use("/api/verifition", verifyRoute)
app.use("/api/admin", adminRoute)
app.use('/api/product', productRoute)


export default app;