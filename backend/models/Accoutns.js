import mongoose from "mongoose";



const accounts = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User2",
        required:true,
    },
    balance:{
        required:true,
        type:Number,
    }
})

export const Accounts = mongoose.model("Accounts",accounts);