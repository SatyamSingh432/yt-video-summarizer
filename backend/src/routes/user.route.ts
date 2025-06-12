import express from "express";

import { getUserSummaries } from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";

const router = express.Router();

router.get("/past-summaries", authenticate, getUserSummaries);

export default router;
