import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db succesfully")
    }catch(err)
    {
        console.log(err);
        console.log("could not connect to db")
        return 
    }
}