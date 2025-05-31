import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 7000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  //isDev: process.env.NODE_ENV !== 'production'
};
