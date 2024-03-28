import { Router } from "express";
const router = Router()
router.post('/signup',(req,res)=>{
    res.send("signup route")
})

router.post('/signin',(req,res)=>{
    res.send("signin route")
})

export {router as authRouter}