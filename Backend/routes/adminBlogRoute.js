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
        const blogs = await Blog.find();
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

router.put("/:slug", async (req, res) => {
    console.log("PUT ROUTE HIT");
    console.log("Slug:", req.params.slug);
    console.log("Request body:", req.body);

    try {
        // First, check if the blog exists
        const existingBlog = await Blog.findOne({ slug: req.params.slug });
        
        if (!existingBlog) {
            console.log("Blog not found with slug:", req.params.slug);
            return res.status(404).json({
                message: `Blog not found with slug: ${req.params.slug}`
            });
        }

        // Remove _id from the update body to prevent issues
        const updateData = { ...req.body };
        delete updateData._id;

        // Update the blog
        const updatedBlog = await Blog.findOneAndUpdate(
            { slug: req.params.slug },
            { $set: updateData },
            { 
                new: true, 
                runValidators: true,
                context: 'query' // This helps with validation
            }
        );

        console.log("Updated blog:", updatedBlog);

        res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });

    } catch (error) {
        console.error("Update error:", error);
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Duplicate key error - slug already exists"
            });
        }
        
        res.status(500).json({
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});


export default router;