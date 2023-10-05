import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL=process.env.MONGO_URL;

export const connect=async()=>{
    try{
        await mongoose.connect(MONGO_URL);
    }catch(err){
        console.log(err.message);
    }
}