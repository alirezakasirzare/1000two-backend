import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { serviceOne } from "@services/test";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  serviceOne();
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
