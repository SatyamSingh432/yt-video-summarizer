import express from "express";
import { getVideoInfo } from "../controllers/videoinfo.controller.ts";
const router = express.Router();

router.post("/videoinfo", getVideoInfo);
export default router;
