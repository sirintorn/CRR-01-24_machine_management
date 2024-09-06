import { Router } from "express";
import { AppRoute } from "./r_app";
import { UserRouter } from "./r_users";
import { PostRoute } from "./r_posts";
import { MachineRoute } from "./r_machine";
import { TintingProfileRoute } from "./r_tinting_profile";


export const routes = Router();

// register router
routes.use(AppRoute);
routes.use(UserRouter);
routes.use(PostRoute);

routes.use(MachineRoute);
routes.use(TintingProfileRoute);

