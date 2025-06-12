import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import infoRouter from "./routes/videoinfo.routes.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { seedAdmin } from "./utils/seedAdmin.js";

// dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sgrgt");
});
app.use("/api/video", infoRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = parseInt(process.env.PORT || "8080", 10);

mongoose.connect(process.env.MONGO_URI!).then(async () => {
  console.log("Mongodb connected");
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
  });
});
