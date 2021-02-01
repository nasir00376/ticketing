import { Express } from "express";
import { CurrentUserRouter } from "./current-user.router";
import { SignUpRouter } from "./signup-router";
import { SignInRouter } from "./signin-router";
import { SignOutRouter } from './signout.router';

export default function (app: Express) {
  app.use("/api/users/signup", SignUpRouter);
  app.use("/api/users/signin", SignInRouter);
  app.use("/api/users/signout", SignOutRouter);
  app.use("/api/users/currentUser", CurrentUserRouter);
};
