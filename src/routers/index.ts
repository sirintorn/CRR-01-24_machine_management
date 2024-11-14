import { Router } from "express";
import { AppRoute } from "./r_app";
import { MachineRoute } from "./r_machine";
import { TintingProfileRoute } from "./r_tinting_profile";
import { FavoriteRoute } from "./r_favorite";
import { LicenseRoutes } from "./r_licenses";
import { DeviceRoutes } from "./r_devices";
import { XBackupRestoreRoutes } from "./x_backup_restore";


export const routes = Router();

// register router
routes.use(AppRoute);

routes.use(MachineRoute);
routes.use(TintingProfileRoute);
routes.use(FavoriteRoute);

routes.use(LicenseRoutes);
routes.use(DeviceRoutes);

routes.use(XBackupRestoreRoutes);
