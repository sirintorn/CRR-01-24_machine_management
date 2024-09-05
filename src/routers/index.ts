import { Router } from "express";
import { AppRoute } from "./r_app";
import { UserRouter } from "./r_users";
import { PostRoute } from "./r_posts";

export const routes = Router();

// register router
routes.use(AppRoute);
routes.use(UserRouter);
routes.use(PostRoute);