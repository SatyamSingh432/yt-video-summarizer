import express from "express";

import {
  getAllUsersData,
  getUserSummaries,
} from "../controllers/user.controller.ts";
import { authenticate } from "../middlewares/authenticate.ts";
import { isAdmin } from "../middlewares/isAdmin.ts";

const router = express.Router();

router.get("/past-summaries", authenticate, getUserSummaries);

router.get("/all-users", isAdmin, getAllUsersData);

export default router;
