import express from "express";

import {
  getVideoInfo,
  getVideoSummary,
} from "../controllers/videoinfo.controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const router = express.Router();

router.post("/videoinfo", authenticate, getVideoInfo);
router.post("/summarize", authenticate, getVideoSummary);

export default router;
