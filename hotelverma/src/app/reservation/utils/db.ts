import mongoose from "mongoose";

const MONGO_URI = process.env.REACT_APP_MONGODB_URI || "your-default-uri-here";

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(MONGO_URI, {
            dbName: "hotelverma",
        });
        isConnected = !!db.connections[0].readyState;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}
