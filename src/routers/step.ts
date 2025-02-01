import { Router } from "express";

import {
  handleCreateOneStep,
  handleDeleteOneStep,
  handleGetOneStepById,
  handleUpdateOneStep,
} from "@controllers/step";
import { authentication } from "@middlewares/authentication";
import { validateBody } from "@middlewares/validation";
import { createStepSchema, updateStepSchema } from "@schemas/step";
import { roleHandler } from "@middlewares/role-handler";

export const stepRouter = Router();

stepRouter.get("/:id", authentication, handleGetOneStepById);
stepRouter.post(
  "/",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  validateBody(createStepSchema),
  handleCreateOneStep
);
stepRouter.put(
  "/:id",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  validateBody(updateStepSchema),
  handleUpdateOneStep
);
stepRouter.delete(
  "/:id",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  handleDeleteOneStep
);
