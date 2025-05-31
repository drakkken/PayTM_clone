import { Router } from "express";
import { verification } from "../middleware/middleware.js";
import { Accounts } from "../models/Accoutns.js";
import mongoose from "mongoose";
import { User2 } from "../models/User2.js";


const accountRouter = Router();



accountRouter.get("/balance",verification,async(req,res)=>{
    try{
        const user = req.userId;
        const body = await Accounts.findOne({user})
        const balance  = body.balance;
        res.status(200).json({
            balance:balance
        })
  



    }catch(err)
    {
        return res.status(500).json({
            message:"could not receive data"
        })
    }
    

})



accountRouter.post("/transfer",verification,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;

    const findUser = await User2.findById(to);
     if (!findUser) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Receiver user does not exist" });
        }

    const senderAccount = await Accounts.findOne({
        user:req.userId
    }).session(session)

      if (!senderAccount || senderAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const receiverAccount = await Accounts.findOne({
        user:to
    })
   if (!receiverAccount ) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "no such receiver"
        });
    }  
    
         await Accounts.updateOne({user:req.userId},{$inc:{balance:-amount}},{session})
         await Accounts.updateOne({user:to},{$inc:{balance:amount}},{session})

    await session.commitTransaction();
    session.endSession()
    res.status(200).json({
        message:"transfer succesfull"
    })


})



export default accountRouter;
