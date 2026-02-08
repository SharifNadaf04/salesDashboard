import { Request, Response } from "express";
import { getStatesService } from "../services/dashboard.service";
import { getDateRangeService } from "../services/dashboard.service";
import { getDashboardDataService } from "../services/dashboard.service";



export const getStates = (req: Request, res: Response) => {
  try {
    const states = getStatesService();
    res.json(states);
  } catch (error) {
    res.status(500).json({ message: "Error fetching states" });
  }
};

export const getDateRange = (req: Request, res: Response) => {
  try {
    const { state } = req.query;

    if (!state || typeof state !== "string") {
      return res.status(400).json({ message: "State is required" });
    }

    const range = getDateRangeService(state);

    if (!range) {
      return res.status(404).json({ message: "No data found for this state" });
    }

    res.json(range);
  } catch (error) {
    res.status(500).json({ message: "Error fetching date range" });
  }
};

export const getDashboardData = (req: Request, res: Response) => {
  try {
    const { state, from, to } = req.query;

    if (!state || !from || !to) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const result = getDashboardDataService(
      state as string,
      from as string,
      to as string
    );

    if (!result) {
      return res.status(404).json({ message: "No data found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};


