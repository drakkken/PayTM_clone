import dotenv from "dotenv";
import { config } from "../config.js";
dotenv.config();
import jwt  from "jsonwebtoken";

export const verification= async(req,res,next)=>{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer"))
    {
        return res.status(400).json({})
    }


    const token = auth.split(" ")[1]
    try{
        const decoded = jwt.verify(token,config.jwtSecret)
        if(decoded.userId)
        {
            req.userId=decoded.userId;
            next()
        }
    }catch(err)
    {
        return res.status(400).json({
            message:"failed to sign in"
        })
    }
}