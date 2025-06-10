import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

import infoRouter from "./routes/videoinfo.routes.ts";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sgrgt");
});
app.use("/api", infoRouter);

const PORT = parseInt(process.env.PORT || "8080", 10);

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
  });
});
