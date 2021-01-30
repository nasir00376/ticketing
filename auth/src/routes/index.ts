import { CurrentUserRouter } from "./current-user.router";
import { SignUpRouter } from "./signup-router";
import { SignInRouter } from "./signin-router";
import { Express } from "express";

export default function (app: Express) {
  app.use("/api/users/signup", SignUpRouter);
  app.use("/api/users/signin", SignInRouter);
  app.use("/api/users/currentUser", CurrentUserRouter);
};
