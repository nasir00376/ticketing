import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";

import { json } from "body-parser";
import { errorHandler } from "./middlewares/error.handler";
import { NotFoundError } from "./error";

import routes from "./routes";

const app = express();
app.set("trust proxy", true);

// Middlewares
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
// app.use("/api/users/signup", SignUpRouter);
routes(app);

app.all("*", async (req, res) => {
  throw new NotFoundError("Route not found.");
});

app.use(errorHandler);

export { app };
