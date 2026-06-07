import bcrypt from "bcryptjs";
import { prisma } from "../../db/prisma.js";
import emailSener from "../../service/emailSender/emailler.service.js";
import otpgenerater from '../../utils/otpgenerater/otpgenrater.service.js'
import jwt from 'jsonwebtoken'

const userVerifition = async (req, res) => {



  const ids = req.token.id;
  const { password } = req.body;



  if (!password) {
    return res.status(400).json({
      message: "fiuld is empty",
      seccuss: false,
    });
  }



  try {



    const isUser = await prisma.user.findUnique({
      where: {
        id: ids,
      },
    });


    if(!isUser){
        return res.status(400).json({
            message :"User is not authorized",
            seccuss : false
        })
    }

    const isPassword = await bcrypt.compare(password , isUser.password)


    if(!isPassword){
        return res.status(400).json({
            message : "password is not valided",
            seccuss : false
        })
    }

    const otp = otpgenerater()

    const isOtp = await prisma.otp.findUnique({
        where : {
            email : isUser.email
        }
    })


    if(isOtp){
        await prisma.otp.delete({
        where : {
            email : isUser.email
        }
    })
    }

    const otps = await prisma.otp.create({
        data : {
            email : isUser.email,
            otp : otp.toString()
        }
    })

    await emailSener({email : isUser.email, otp})


    const userDelete = jwt.sign(
        {
            id : isUser.id,
            email : isUser.email
        },
        process.env.JWT_KEY
    )


    res.cookie("userDelete", userDelete ,
        {
            httpOnly : true,
            secure : false, // ture use kanana mujhe
            sameSite : 'lax', //strict use
        }
    )


    return res.status(200).json({
        message : "please otp verify",
        seccuss : true
    })
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
        message : "some problem in server",
        seccuss : false
    })
  }
};

export default userVerifition;