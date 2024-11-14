import express from "express";
import {
  getTaskDetailsByUserId,
  getTasksByUserId,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import authenticate from "../middleware/AuthMiddleware";
import { validate } from "../middleware/ValidationMiddleware";
import {
  updateTaskSchema,
  createTaskSchema,
  idSchema,
} from "../core/entity/task";

const taskRoutes = express.Router();

taskRoutes.get("/", authenticate, getTasksByUserId);
taskRoutes.get(
  "/:id",
  authenticate,
  validate(idSchema),
  getTaskDetailsByUserId
);
taskRoutes.post("/", authenticate, validate(createTaskSchema), addTask);
taskRoutes.put("/", authenticate, validate(updateTaskSchema), updateTask);
taskRoutes.delete("/", authenticate, validate(idSchema), deleteTask);

export default taskRoutes;
