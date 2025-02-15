import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import tasksRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.API_CONNECTION_STRING)
  .then(() => console.log("Connexion à mongoDB ok"))
  .catch(() => console.log("Connexion à mongoDB failed"));

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Coucou!" });
});

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

app.all("*", (req, res) => {
  res.status(404).json("Not Found");
});

export default app;
