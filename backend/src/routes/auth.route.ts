import express from "express";

import { authenticate } from "../middlewares/authenticate.js";
import { login, signUp, userData } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/me", authenticate, userData);

export default router;
