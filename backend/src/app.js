import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);

 

 