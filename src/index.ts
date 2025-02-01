import "express-async-errors";
import "./libs/environment";

import cors from "cors";
import express, { Express } from "express";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import { jwtStrategy } from "@libs/pasport";
import { errorHandler } from "@middlewares/error-handler";
import { chapterRouter } from "@routers/chapter";
import { stepRouter } from "@routers/step";
import { userRouter } from "@routers/user";

import { applicationDocs } from "./docs";
import { authRouter } from "@routers/auth";

passport.use(jwtStrategy);

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
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
