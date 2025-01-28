import { Router } from "express";

import { validateBody } from "@middlewares/validation";
import { createStepSchema, updateStepSchema } from "@schemas/step";

import {
  handleCreateOneStep,
  handleDeleteOneStep,
  handleGetOneStepById,
  handleUpdateOneStep,
} from "@controllers/step";

export const stepRouter = Router();

stepRouter.get("/:id", handleGetOneStepById);
stepRouter.post("/", validateBody(createStepSchema), handleCreateOneStep);
stepRouter.put("/:id", validateBody(updateStepSchema), handleUpdateOneStep);
stepRouter.delete("/:id", handleDeleteOneStep);
