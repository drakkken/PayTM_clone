
import { Router } from 'express';
import userRouter from './user.js';
import accountRouter from './accounts.js';




const mainRouter = Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/accounts",accountRouter)




export default mainRouter