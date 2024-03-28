import { Router } from "express";
const router = Router();
router.post("/create",(req,res)=>{
    res.send("blog posted")
})

router.put("/update",(req,res)=>{
    res.send("blog updatedd")
})
router.get("/:id",(req,res)=>{
    res.send("blog posted")
})
router.get("/bulk",(req,res)=>{
    res.send("blog posted")
})
export {router as blogRouter}