import express from "express";


const otpRoute = express.Router();



import OtpCreate from "../../controllers/Otp/otp.create.js";
import otpVerify from "../../controllers/Otp/otp.verify.js"


otpRoute.post("/create", OtpCreate);
otpRoute.post("/verify", otpVerify)









export default otpRoute;