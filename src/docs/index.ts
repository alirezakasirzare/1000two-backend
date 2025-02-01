import { authDocs } from "./auth";
import { chapterDocs } from "./chapter";
import { stepDocs } from "./step";
import { swaggerConfig } from "./swagger-config";
import { userDocs } from "./user";

export const applicationDocs = {
  ...swaggerConfig,
  paths: {
    ...authDocs,
    ...userDocs,
    ...chapterDocs,
    ...stepDocs,
  },
};
