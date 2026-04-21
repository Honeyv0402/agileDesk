import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/project-management");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};