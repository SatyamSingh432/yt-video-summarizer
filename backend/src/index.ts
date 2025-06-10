import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = parseInt(process.env.PORT || "8080", 10);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
  });
});
