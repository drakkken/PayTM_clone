import express from 'express'
import mainRouter from './routes/index.js';
import  dotenv  from 'dotenv';
import cors from 'cors'
import { connectDb } from './db/db.js';
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",  // Vite's default dev server
    credentials: true                 // if you're sending cookies or using Authorization headers
  }));





app.use("/api/v1",mainRouter)













await connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT} `)
})


