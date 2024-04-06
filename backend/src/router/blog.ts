import { Router } from "express";
import db from "../lib/db";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const blog = req.body;
    // @ts-ignore
    const userId = req.userId;
    console.log("purnima ", userId);
    const newBlog = await db.post.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: userId,
      },
    });
    console.log(newBlog);
    return res.status(201).json({
      newBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    let id = "";
    const blogId = req.query.blogId;
    if (typeof blogId === "string") {
      id = blogId;
    }
    console.log(id);
    const { title, content } = req.body;
    await db.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    console.log("purnima");
    return res.status(200).json({
      msg: "updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
});

router.get("/bulk", async (req, res) => {
  try {
   const blogs = await db.post.findMany({
      include: {
        author: true,
      },
    });
    return res.status(200).json(
      blogs
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
});


router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await db.post.findFirst({
      where: {
        id: blogId,
      },
      include: {
        author: true,
      },
    });
    console.log(blog);
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "something went wrong",
    });
  }
});

export { router as blogRouter };
