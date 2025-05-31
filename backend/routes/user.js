import { Router } from "express";
import { User2 } from "../models/User2.js";

import jwt from 'jsonwebtoken'

import z from "zod"
import mongoose from "mongoose";
import { verification } from "../middleware/middleware.js";
import { Accounts } from "../models/Accoutns.js";
import dotenv from "dotenv";
import { config } from "../config.js";
dotenv.config();





const userRouter = Router();
const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string()
})


userRouter.post("/signUp", async (req, res) => {
    try {
        const body = req.body;
        const parsed = signUpSchema.safeParse(body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "error invalid inputs/ Email already taken"
            });
        }

        const { email, firstName, lastName, password, username } = parsed.data;

        const user = await User2.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email or username"
            });
        }

        const newUser = new User2({ firstName, lastName, email, password, username });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            config.jwtSecret
        );

        await Accounts.create({
            user: newUser._id,
            balance: 1 + Math.random() * 1000
        });

        return res.status(200).json({
            message: "Successfully added a new user",
            token: token
        });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({
            message: "Something went wrong during signup"
        });
    }
});



const singInSchema = z.object({
    email:z.string().email(),

    password:z.string()
})
userRouter.post("/signIn",async(req,res)=>{
        const userData = req.body;
        const passed = singInSchema.safeParse(userData)
        if(!passed.success)
        {
            return res.status(500).json({
                message:"failed to sign / INvalid inputs"
            })
        }
        const {email,password} = userData;

        const match = await User2.findOne({email,password})

        if(!match)
        {
            return res.status(500).json({message:"such a user does not exist signup first"})
        }

        const token = jwt.sign({
            userId:match._id,

        },config.jwtSecret)


        res.status(200).json({
            token
        })

})

// this is done after signing in so noo need to send usenam again handled in middleware
const updateBody = z.object({
   // username:z.string().optional(),
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


userRouter.put("/",verification, async(req,res)=>{
    try{
        
       const body = updateBody.safeParse(req.body)
       if(!body.success)
       {
        return res.status(500).json({message:"enter correct password"})
       }

       await User2.findByIdAndUpdate(req.userId,req.body)

    }catch(err)
    {
        return res.status(400).json({message:"something went wrong"})
    }

    res.status(200).json({message:"updated successfully"})
})



userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User2.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


export default userRouter;