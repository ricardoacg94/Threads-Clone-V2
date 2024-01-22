import express from "express";
import connectDB from "./DB/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
connectDB();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.listen(PORT, () => {
  console.log(`Server has started at port: ${PORT}`);
});
