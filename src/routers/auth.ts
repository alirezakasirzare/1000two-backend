import { Router } from "express";

import { validateBody } from "@middlewares/validation";
import { loginSchema, registerSchema } from "@schemas/auth";
import {
  getCurrentUserData,
  handleLogin,
  handleRegister,
} from "@controllers/auth";
import { authentication } from "@middlewares/authentication";

export const authRouter = Router();

authRouter.get("/me", authentication, getCurrentUserData);
authRouter.post("/login", validateBody(loginSchema), handleLogin);
authRouter.post("/register", validateBody(registerSchema), handleRegister);
