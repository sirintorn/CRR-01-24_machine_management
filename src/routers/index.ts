import { Router } from "express";
import { AppRoute } from "./r_app";
import { MachineRoute } from "./r_machine";
import { TintingProfileRoute } from "./r_tinting_profile";


export const routes = Router();

// register router
routes.use(AppRoute);

routes.use(MachineRoute);
routes.use(TintingProfileRoute);

