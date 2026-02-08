import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
