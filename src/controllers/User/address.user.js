import { prisma } from "../../db/prisma.js";

export const addressCreate = async (req, res) => {
  const { address } = req.body;
  const id = req.token.id;

  if (!address) {
    return res.status(400).json({
      message: "not valid your address",
      seccuss: false,
    });
  }

  try {
    const isAdd = await prisma.address.create({
      data: {
        isAddress: address,
        userId: id,
      },
    });

    if (!isAdd) {
      return res.status(400).json({
        message: "some problem in server loign agarin",
        seccuss: false,
      });
    }


    return res.status(201).json({
            message : "address create seccussfully",
            seccuss : true
        })
  } catch (error) {
    return res.status(400).json({
      message: "somthing problem in server try again",
      seccuss: false,
    });
  }
};




export const addressUpdate = async (req, res) => {
  const { address } = req.body;
  const id = req.token.id;

  if (!address) {
    return res.status(400).json({
      message: "not valid your address",
      seccuss: false,
    });
  }

  try {
    const isUser = await prisma.user.findUnique({
        where : {
            id : id
        },
        include : {
          address : true
        }
    });

    if (!isUser) {
      console.log(isUser)
      return res.status(400).json({
        message: "some problem in server loign agarin",
        seccuss: false,
      });
    }
    
    const isAdd = await prisma.address.update({
        where : {
            id : isUser.address[0].id
        },
        data : {
          isAddress : address
        }
    });

    return res.status(201).json({
            message : "address update seccussfully",
            seccuss : true
        })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "somthing problem in server try again",
      seccuss: false,
    });
  }
};
