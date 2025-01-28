import { Router } from "express";

import { validateBody } from "@middlewares/validation";
import { createChapterSchema, updateChapterSchema } from "@schemas/chapter";

import {
  handleCreateOneChapter,
  handleDeleteOneChapter,
  handleGetAllChapters,
  handleGetAllStepsByChapterId,
  handleGetOneChapterById,
  handleUpdateOneChapter,
} from "@controllers/chapter";

export const chapterRouter = Router();

chapterRouter.get("/", handleGetAllChapters);
chapterRouter.get("/:id", handleGetOneChapterById);
chapterRouter.get("/:id/steps", handleGetAllStepsByChapterId);
chapterRouter.post(
  "/",
  validateBody(createChapterSchema),
  handleCreateOneChapter
);
chapterRouter.put(
  "/:id",
  validateBody(updateChapterSchema),
  handleUpdateOneChapter
);
chapterRouter.delete("/:id", handleDeleteOneChapter);
