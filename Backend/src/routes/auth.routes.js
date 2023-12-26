import { Router } from "express";
import { getAuth, postAuth } from "../controllers/auth.controller.js";

const router = Router();

router.get("/auth", getAuth);
router.post("/auth", postAuth);

export default router;
