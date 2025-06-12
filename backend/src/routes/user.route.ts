import express from "express";

import {
  getAllUsersData,
  getUserSummaries,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/past-summaries", authenticate, getUserSummaries);

router.get("/all-users", isAdmin, getAllUsersData);

export default router;
