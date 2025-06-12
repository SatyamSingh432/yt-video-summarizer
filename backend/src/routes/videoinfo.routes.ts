import express from "express";

import {
  getVideoInfo,
  getVideoSummary,
} from "../controllers/videoinfo.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/videoinfo", authenticate, getVideoInfo);
router.post("/summarize", authenticate, getVideoSummary);

export default router;
