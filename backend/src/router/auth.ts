import { Router } from "express";
import db from "../lib/db";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const userDetail = req.body;
    const userExists = await db.user.findFirst({
      where: {
        email: userDetail.email
      },
    });
    if (userExists) {
      return res.status(409).json({ msg: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(userDetail.password, 10);
    const user = await db.user.create({
      data: {
        name: userDetail.name,
        email: userDetail.email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({id:user.id }, process.env.JWT_SECRET as string)
    console.log(token)
    console.log(user)
    return res.status(201).json({  
        token, 
        userId:user.id,

    })
  } catch (err:any) {
    console.log(err)
    return res.status(500).json({msg:"something went wrong"})
  }
});

router.post("/signin", async(req, res) => {
    try{
        const userDetail=req.body;
        const userExists=await db.user.findFirst({
            where:{
                email:userDetail.email
            }
        })
        if(!userExists){
            return res.status(404).json({msg:"user not found"})
        }
        const isPasswordValid=bcrypt.compare(userDetail.password,userExists.password)
        if(!isPasswordValid){
            return res.status(403).json({
                msg:"wrong credentials"
            })
        }
        const token=jwt.sign({id:userExists.id},process.env.JWT_SECRET as string)
        return res.status(200).json(token)
    }
    catch(err:any){
        console.log(err)
        return res.status(500).json({msg:"something went wrong"})
    }
  
});

export { router as authRouter };
