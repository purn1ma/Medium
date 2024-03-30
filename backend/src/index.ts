import express from "express"
import { authRouter } from "./router/auth"
import { blogRouter } from "./router/blog"

const app = express()
app.use(express.json())
app.use('/api/v1',authRouter)
app.use('/api/v1/blog',blogRouter)
app.listen(5000,()=>console.log("server started"))

