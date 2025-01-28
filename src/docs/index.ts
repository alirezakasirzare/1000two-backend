import { chapterDocs } from "./chapter";
import { stepDocs } from "./step";
import { swaggerConfig } from "./swagger-config";

export const applicationDocs = {
  ...swaggerConfig,
  paths: {
    ...chapterDocs,
    ...stepDocs,
  },
};
