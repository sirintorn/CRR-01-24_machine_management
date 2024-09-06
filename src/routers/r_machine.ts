import { Router } from "express";
import { MachineSchema } from "../models/m_machines";
import { DtoGetMachine } from "../dtos/dto_get_machine";
import { MDCAPI } from "../services/mdc";

export const MachineRoute = Router();

const path = '/machine';

MachineRoute.route(path + '/by-company/:company_id').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        const machine = await machineSCH.getByCompany(company_id);

        res.status(200).send(machine);
    } catch (error) {
        res.status(400).send(error);
    }
});

MachineRoute.route(path + '/by-company/:company_id/dto').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        const machines = await machineSCH.getByCompany(company_id);
        const dbVersions = await MDCAPI.getDBVersionByCompany(company_id);

        const dtos = DtoGetMachine.parseFromArray(machines, dbVersions);

        res.status(200).send(dtos);
    } catch (error) {
        res.status(400).send(error);
    }
});