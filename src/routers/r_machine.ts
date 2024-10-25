import { Router } from "express";
import { Machine, MachineSchema } from "../models/m_machines";
import { DtoGetMachine } from "../dtos/dto_get_machine";
import { MDCAPI } from "../services/mdc";
import  QRCode  from "qrcode";

export const MachineRoute = Router();

const path = '/machine';

//GET BY COMPANY
MachineRoute.route(path + '/by-company/:company_id').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        let machines = await machineSCH.getByCompany(company_id);

        for (let i = 0; i < machines.length; i++) {
            let item = machines[i] as any;
            if(item.db_version_id){
                item._databases = 1;
            }
            if(item.tinting_profile_id){
                item._tintingProfile = "UPLOADED"
            }else{
                item._tintingProfile = "EMPTY"
            }
        }

        res.status(200).send(machines);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] GET BY COMPANY
MachineRoute.route(path + '/by-company/:company_id/admin').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        let machines = await machineSCH.adminGetByCompany(company_id);

        for (let i = 0; i < machines.length; i++) {
            let item = machines[i] as any;
            if(item.db_version_id){
                item._databases = 1;
            }
            if(item.tinting_profile_id){
                item._tintingProfile = "UPLOADED"
            }else{
                item._tintingProfile = "EMPTY"
            }
        }

        res.status(200).send(machines);
    } catch (error) {
        res.status(400).send(error);
    }
});

//DTO GET BY COMPANY
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

//CREATE
MachineRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body as Machine;

        const machineSCH = new MachineSchema();
        const result = await machineSCH.create(data, true);
        
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//UPDATE
MachineRoute.route(path + '/:machine_id').put(async (req, res) => {
    try {
        const data = req.body as Machine;
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        const result = await machineSCH.update(machine_id, data);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//DELETE
MachineRoute.route(path + '/:machine_id').delete(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        await machineSCH.delete(machine_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET SINGLE
MachineRoute.route(path + '/:machine_id').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        const result = await machineSCH.get(machine_id);

        if(result)res.status(200).send(result);
        else res.status(404).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//DTO GET SINGLE
MachineRoute.route(path + '/:machine_id/dto').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        const result = await machineSCH.get(machine_id) as Machine;
        let dto = new DtoGetMachine(result);

        if(result)res.status(200).send(dto);
        else res.status(404).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//GENERATE MACHINE QRCODE 
MachineRoute.route(path + '/:machine_id/qrcode').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id;

        const machineSCH = new MachineSchema();
        const machine = await machineSCH.get(machine_id) as Machine;
        const result = {
            serialNo: machine.machine_serial_no,
            covStart: machine.coverage_start_date,
            covEnd: machine.coverage_end_date
        }

        QRCode.toDataURL(JSON.stringify(result), (err: any, url: any) => {
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send(`<html><body><img src="${url}"/></body></html>`);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});