import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import blogRoute from "./routes/blogRoute.js"
dotenv.config();

const app = express();

app.use(cors())
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

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))