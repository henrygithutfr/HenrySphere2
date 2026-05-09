import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import blogRoute from "./routes/blogRoute.js"
import adminBlogRoute from "./routes/adminBlogRoute.js"
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // or whatever port your React app runs on
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Successfully connected!✅")
    } catch (error) {
        console.error(error.message)
    }
}

connectDb();

app.use("/api/blogs", blogRoute)
app.use("/admin/api/blogs", adminBlogRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))