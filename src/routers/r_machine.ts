import { Router } from "express";
import { COMPANY_ROLES, Machine, MachineSchema } from "../models/m_machines";
import { DtoGetMachine } from "../dtos/dto_get_machine";
import { MDCAPI } from "../services/mdc";
import  QRCode  from "qrcode";
import { machine } from "os";

export const MachineRoute = Router();

const path = '/machine';

//GET BY COMPANY
MachineRoute.route(path + '/by-company/:company_id').get(async (req, res) => {
    try {
        const co_type = req.query.co || COMPANY_ROLES.coloriance;
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        let machines: Machine[] = [];
        
        if(co_type == COMPANY_ROLES.coloriance) machines = await machineSCH.getByCompany(company_id);
        if(co_type == COMPANY_ROLES.agent) machines = await machineSCH.getByAgent(company_id);
        if(co_type == COMPANY_ROLES.paint_co) machines = await machineSCH.getByPaintCo(company_id);
        if(co_type == COMPANY_ROLES.paint_store) machines = await machineSCH.getByPaintStore(company_id);

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
        const co_type = req.query.co || COMPANY_ROLES.coloriance;
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        let machines: Machine[] = [];
        
        if(co_type == COMPANY_ROLES.coloriance) machines = await machineSCH.adminGetByCompany(company_id);
        if(co_type == COMPANY_ROLES.agent) machines = await machineSCH.adminGetByAgent(company_id);
        if(co_type == COMPANY_ROLES.paint_co) machines = await machineSCH.adminGetByPaintCo(company_id);
        if(co_type == COMPANY_ROLES.paint_store) machines = await machineSCH.adminGetByPaintStore(company_id);


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
        const co_type = req.query.co || COMPANY_ROLES.coloriance;
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        let machines: Machine[] = [];
        
        if(co_type == COMPANY_ROLES.coloriance) machines = await machineSCH.getByCompany(company_id);
        if(co_type == COMPANY_ROLES.agent) machines = await machineSCH.getByAgent(company_id);
        if(co_type == COMPANY_ROLES.paint_co) machines = await machineSCH.getByPaintCo(company_id);
        if(co_type == COMPANY_ROLES.paint_store) machines = await machineSCH.getByPaintStore(company_id);


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

//ASSIGN MACHINE TO COMPANY


//SEARCH BY COMPANY
MachineRoute.route(path + '/by-company/:company_id/search').get(async (req, res) => {
    try {
        const co_type = req.query.co || COMPANY_ROLES.coloriance;
        const keyword = req.query.keyword as string;
        const company_id = req.params.company_id as string;
        
        const schema = new MachineSchema();

        let results: Machine[] = [];
        
        if(keyword){
            let machines: Machine[] = [];
            
            if(co_type == COMPANY_ROLES.coloriance) machines = await schema.adminSearchByCompany(company_id, keyword);
            if(co_type == COMPANY_ROLES.agent) machines = await schema.adminSearchByAgent(company_id, keyword);
            if(co_type == COMPANY_ROLES.paint_co) machines = await schema.adminSearchByPaintCo(company_id, keyword);
            if(co_type == COMPANY_ROLES.paint_store) machines = await schema.adminSearchByPaintStore(company_id, keyword);
            
            results.push(...machines);
        }else{
            let machines: Machine[] = [];
            
            if(co_type == COMPANY_ROLES.coloriance) machines = await schema.adminGetByCompany(company_id);
            if(co_type == COMPANY_ROLES.agent) machines = await schema.adminGetByAgent(company_id);
            if(co_type == COMPANY_ROLES.paint_co) machines = await schema.adminGetByPaintCo(company_id);
            if(co_type == COMPANY_ROLES.paint_store) machines = await schema.adminGetByPaintStore(company_id);
            
            results.push(...machines);
        }

        res.status(200).send(results);
    } catch (error) {
        res.status(400).send(error);
    }
});









//GET BY AGENT?
MachineRoute.route(path + '/admin/get/:company_id/:agent_id').get(async (req, res) => {
    console.log("Request received for agent_id:", req.params.agent_id);

    try {
        const agent_id = req.params.agent_id;
        const company_id = req.params.company_id;

        if (!agent_id) {
            return res.status(400).send({ error: "agent_id is required" });
        }

        const schema = new MachineSchema();
        const result = await schema.getAllMachineByAgentCompany(agent_id, company_id);

        console.log("Machines fetched successfully:", result);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error fetching machines:", error);
        res.status(400).send(error);
    }
});
