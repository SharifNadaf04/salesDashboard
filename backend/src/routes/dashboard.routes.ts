import express from "express";
import { getStates,getDateRange,getDashboardData } from "../controllers/dashboard.controller";



const router = express.Router();

router.get("/states", getStates);
router.get("/date-range", getDateRange);
router.get("/dashboard", getDashboardData);



export default router;
