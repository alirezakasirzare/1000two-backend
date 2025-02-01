import { Router } from "express";

import { handleGetAllUsers } from "@controllers/user";

export const userRouter = Router();

userRouter.get("/", handleGetAllUsers);
