import express from "express";
import Blog from "../models/blogSchema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {

    const data = new Blog(req.body);

    const savedBlog = await data.save();

    res.status(201).json({
      message: "Blog saved successfully",
      blog: savedBlog,
    });

  } catch (error) {

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Slug already exists",
    });
  }

  console.error(error.message);

  res.status(500).json({
    message: "Failed to save blog",
  });
}
});

router.get("/", async (req, res) =>{
    try {
        const blogs = await Blog.find({status: "published"});
        res.status(200).json(blogs)
    } catch (error) {
        console.error(error.message)
    }
})

router.get("/:slug", async (req, res) => {
    try {

        const blog = await Blog.findOne({
            slug: req.params.slug
        });

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.status(200).json(blog);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


export default router;