import express from "express";
import { signUp, signIn } from "../controllers/auth.controller";
import { validate } from "../middleware/ValidationMiddleware";
import { loginSchema, registerSchema } from "../core/entity/auth";

const authRoutes = express.Router();

authRoutes.post("/signup", validate(registerSchema), signUp);
authRoutes.post("/login", validate(loginSchema), signIn);

export default authRoutes;
