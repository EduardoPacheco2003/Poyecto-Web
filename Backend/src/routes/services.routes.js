import { Router } from "express";
import {
  postBuyService,
  getServices,
  getServicesByCustomer,
  patchServiceAvailability,
  getServicesCategories,
  postNewService,
  getServiceById,
  putService,
  deleteService,
} from "../controllers/services.controller.js";

const router = Router();

//GET
router.get("/services", getServices);
router.get("/services/categories", getServicesCategories);
router.get("/services/:id", getServiceById);
router.get("/services/boughtByCustomer/:id", getServicesByCustomer);

//POST
router.post("/services/buy", postBuyService);
router.post("/services", postNewService);
//PUT
router.put("/services/:id", putService);

//DELETE
router.delete("/services/:id", deleteService);
//PATCH
router.patch("/services/availability/:id", patchServiceAvailability);

export default router;
