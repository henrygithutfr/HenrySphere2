import mongoose from "mongoose";

const metaBlog = new mongoose.Schema({
    meta_title: { type: String, required: true },
    meta_description: { type: String, required: true },
    meta_author: { type: String, required: true },
    meta_keyword: { type: String, required: true },
}, { _id: false })

const blogSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    meta: metaBlog,
    title: { type: String, required: true },
    excerpt: { type: String},
    author: { type: String, required: true},
    cover: { type: String, required: true },
    content: { type: String, required: true},
    category: { type: String, required: true},
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    status: { type: String, enum: [ "draft", "published" ], default: "draft" },
})

const Blog = mongoose.model("blogs", blogSchema);
export default Blog;