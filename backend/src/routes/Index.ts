import express from "express";
import userRoutes from "./user.routes";
import taskRoutes from "./task.routes";
import authRoutes from "./auth.routes";

const routes = express.Router();

routes.get("/", (_, res) => {
  res.send("Welcome to the Task Management API!");
});

routes.use("/users", userRoutes);
routes.use("/tasks", taskRoutes);
routes.use("/auth", authRoutes);

export default routes;
