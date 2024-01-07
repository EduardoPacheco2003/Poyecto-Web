import { Router } from "express";
import {
  getPendingSaleById,
  getPendingSales,
  putCompleteSale,
} from "../controllers/sales.controller.js";

const router = Router();

//GET
router.get("/sales/pending", getPendingSales);
router.get("/sales/pending/:id", getPendingSaleById);
router.put("/sales/pending/:id", putCompleteSale);

export default router;
