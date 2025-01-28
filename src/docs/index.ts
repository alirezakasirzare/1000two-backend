import { chapterDocs } from "./chapter";
import { swaggerConfig } from "./swagger-config";

export const applicationDocs = {
  ...swaggerConfig,
  ...chapterDocs,
};
