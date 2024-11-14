import express from "express";
import {
  getUserDetails,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import authenticate from "../middleware/AuthMiddleware";
import { validate } from "../middleware/ValidationMiddleware";
import { createSchema, idSchema } from "../core/entity/user";

const userRoutes = express.Router();

userRoutes.get("/:id", authenticate, validate(idSchema), getUserDetails);
userRoutes.put("/", authenticate, validate(createSchema), updateUser);
userRoutes.delete("/", authenticate, validate(idSchema), deleteUser);

export default userRoutes;
