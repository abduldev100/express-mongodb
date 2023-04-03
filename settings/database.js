import mongoose from "mongoose";
import dotenv from "dotenv";

// ENV PROPS
dotenv.config()

const ConnectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017", {
            dbName: process.env.DATABASE,
            // user: process.env.USERNAME,
            // pwd: process.env.PASSWORD
        })
        console.log("Database connected!")
    } catch (err) {
        console.log(err)
    }
}

export default ConnectDatabase;