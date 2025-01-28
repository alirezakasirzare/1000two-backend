import express, { Express } from "express";
import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();

import { chapterRouter } from "@routers/chapter";
import { errorHandler } from "@middlewares/error-handler";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/chapter", chapterRouter);
app.all("*", (req, res) => {
  res.send("not found");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
