import { Router } from "express";

import {
  handleCreateOneChapter,
  handleDeleteOneChapter,
  handleGetAllChapters,
  handleGetAllStepsByChapterId,
  handleGetOneChapterById,
  handleUpdateOneChapter,
} from "@controllers/chapter";
import { authentication } from "@middlewares/authentication";
import { validateBody } from "@middlewares/validation";
import { createChapterSchema, updateChapterSchema } from "@schemas/chapter";
import { roleHandler } from "@middlewares/role-handler";

export const chapterRouter = Router();

chapterRouter.get("/", authentication, handleGetAllChapters);
chapterRouter.get("/:id", authentication, handleGetOneChapterById);
chapterRouter.get("/:id/steps", authentication, handleGetAllStepsByChapterId);
chapterRouter.post(
  "/",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  validateBody(createChapterSchema),
  handleCreateOneChapter
);
chapterRouter.put(
  "/:id",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  validateBody(updateChapterSchema),
  handleUpdateOneChapter
);
chapterRouter.delete(
  "/:id",
  authentication,
  roleHandler(["GameDesignerAdmin", "SuperAdmin"]),
  handleDeleteOneChapter
);
