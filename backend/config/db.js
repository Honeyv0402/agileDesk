// import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error("DB connection failed:", error.message);
//         process.exit(1);
//     }
// };


import dns from "dns";
import mongoose from "mongoose";

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Force IPv4 first
dns.setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};