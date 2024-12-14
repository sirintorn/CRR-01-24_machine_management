import { Router } from "express";
import { Device, DeviceSchema } from "../models/m_devices";
import { Machine, MachineSchema } from "../models/m_machines";

export const DeviceRoutes = Router();
const path = '/devices';

//GET BY MACHINE
DeviceRoutes.route(path + '/by-machine/:machine_id').get(async (req, res) => {
    try {
        const machine_id = req.params.machine_id as string;

        const schema = new DeviceSchema();
        const result = await schema.getByMachine(machine_id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//GET BY LICENSE
DeviceRoutes.route(path + '/by-license/:license_id').get(async (req, res) => {
    try {
        const license_id = req.params.license_id as string;

        const schema = new DeviceSchema();
        const result = await schema.getByLicense(license_id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] REGISTER DEVICE UNDER MACHINE
DeviceRoutes.route(path + '/manage/register').post(async (req, res) => {
    try {
        const device = req.body as Device;

        const machineSchema = new MachineSchema();
        const machine = await machineSchema.get(device.machine_id) as Machine;

        if(machine){
            const schema = new DeviceSchema();
            const devices = await schema.getByMachine(machine.id);

            if(devices.length < machine.device_limit){
                const result = await schema.create(device, true);
                res.status(200).send(result);
            }else{
                res.status(401).send(`Registered devices exceed the limits of ${machine.device_limit}.`);
            }
        }else{
            res.status(404).send('Target machine not found.')
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] GET DEVICE
DeviceRoutes.route(path + '/manage/:device_id').get(async (req, res) => {
    try {
        const device_id = req.params.device_id as string;

        const schema = new DeviceSchema();
        const result = await schema.get(device_id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] UPDATE DEVICE
DeviceRoutes.route(path + '/manage/:device_id').put(async (req, res) => {
    try {
        const device_id = req.params.device_id as string;
        const device = req.body as Device;

        const schema = new DeviceSchema();
        const result = await schema.update(device_id, device);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] DELETE DEVICE
DeviceRoutes.route(path + '/manage/:device_id').delete(async (req, res) => {
    try {
        const device_id = req.params.device_id as string;

        const schema = new DeviceSchema();
        await schema.delete(device_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});