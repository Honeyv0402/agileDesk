import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongo:oIFUbWsdRoYaEipGZKgtrpWBBzDlRQol@nozomi.proxy.rlwy.net:41047");
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};