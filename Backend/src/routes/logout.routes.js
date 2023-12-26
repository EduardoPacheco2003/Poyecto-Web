import { Router } from "express";
import { postLogout } from "../controllers/logout.controller.js";

const router = Router();

router.post("/logout", postLogout);

export default router;
