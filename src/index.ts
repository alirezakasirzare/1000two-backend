import express, { Express } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import { chapterRouter } from "@routers/chapter";
import { errorHandler } from "@middlewares/error-handler";
import { applicationDocs } from "./docs";
import { stepRouter } from "@routers/step";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/chapter", chapterRouter);
app.use("/api/step", stepRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(applicationDocs));

app.all("*", (req, res) => {
  res.send("not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
