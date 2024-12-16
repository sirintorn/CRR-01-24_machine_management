import { Router } from "express";
import { CircuitInfoSchema } from "../models/m_circuit_infos";
import { Machine, MachineSchema } from "../models/m_machines";

export const XRealtimeStatusRoutes = Router();

const path = '/realtime-status';

XRealtimeStatusRoutes.route(path + '/by-company/:company_id').get(async (req, res) => {
    try {
        const company_id = req.params.company_id;

        const machineSCH = new MachineSchema();
        const machines = await machineSCH.adminGetByCompany(company_id);

        const circuitInfoSCH = new CircuitInfoSchema();

        let arr: any[] = [];

        for (let i = 0; i < machines.length; i++) {
            const item = machines[i];
            const circuitInfos = await circuitInfoSCH.getByTintingProfile(item.id);

            const status = 'on';
            const lastOnline = '1 m ago';
            arr.push({
                machine: item,
                circuitInfos: circuitInfos,
                status: status,
                lastOnline: lastOnline
            });
        }

        res.status(200).send(arr);
    } catch (error) {
        res.status(400).send(error);
    }
});

//SEARCH BY COMPANY
XRealtimeStatusRoutes.route(path + '/by-company/:company_id/search').get(async (req, res) => {
    try {
        const keyword = req.query.keyword as string;
        const company_id = req.params.company_id as string;
        
        const schema = new MachineSchema();
        const circuitInfoSCH = new CircuitInfoSchema();

        let results: Machine[] = [];
        let arr: any[] = [];
        if(keyword){
            let machines = await schema.adminSearchByCompany(company_id, keyword);
            results.push(...machines);
        }else{
            let machines = await schema.adminGetByCompany(company_id);
            results.push(...machines);
        }

        for (let i = 0; i < results.length; i++) {
            const item = results[i];
            const circuitInfos = await circuitInfoSCH.getByTintingProfile(item.id);

            const status = 'on';
            const lastOnline = '1 m ago';
            arr.push({
                machine: item,
                circuitInfos: circuitInfos,
                status: status,
                lastOnline: lastOnline
            });
        }

        res.status(200).send(arr);
    } catch (error) {
        res.status(400).send(error);
    }
});