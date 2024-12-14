import { Router } from "express";
import { EncryptedLicense, License, LicenseSchema } from "../models/m_licenses";
import QRCode from 'qrcode';
import { DTOLicense } from "../dtos/dto_license";
import { Device, DeviceSchema } from "../models/m_devices";
import { DTOEncryptedLicense } from "../dtos/dto_encrypted_license";
import { Machine, MachineSchema } from "../models/m_machines";
import { DTODeactivate } from "../dtos/dto_deactivate";

export const LicenseRoutes = Router();

const path = '/licenses';

LicenseRoutes.route(path + '/test/encrypt').post(async (req, res) => {
    try {
        let license = req.body as License;

        const schema = new LicenseSchema();
        let result = schema.encryptLicense(license);
        result.license_qr = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        result.machine_qr = `${req.protocol}://${req.get('host')}${req.originalUrl}`

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

LicenseRoutes.route(path + '/test/encrypt/qrcode').get(async (req, res) => {
    try {
        let license: License = {
            "id": "abcdefghij",
            "company_id": "testcompny",
            "machine_id": "skdjfnopsa",
            "machine_serial_no": "001-machine-seqr",
            "type": "free",
            "expired_at": "Wed, 23 Oct 2024 08:56:54 GMT"
        };
        const schema = new LicenseSchema();
        const result = schema.encryptLicense(license);

        QRCode.toDataURL(result.cipher, (err: any, url: any) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(`<html><body><img src="${url}"/></body></html>`);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

LicenseRoutes.route(path + '/test/decrypt').post(async (req, res) => {
    try {
        let encrypted = req.body as EncryptedLicense;

        const schema = new LicenseSchema();
        const result = schema.decryptLicense(encrypted.cipher, encrypted.key);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});


//[ADMIN] Register License + generate QRCode
LicenseRoutes.route(path + '/manage/register').post(async (req, res) => {
    try {
        let license = req.body as License;

        const schema = new LicenseSchema();
        let result = await schema.registerLicense(license);

        const licenseQRPath = `${req.protocol}://${req.get('host')}/api${path}/qrcode/${result.id}`;
        const machineQRPath = `${req.protocol}://${req.get('host')}/api/machine/${result.machine_id}/qrcode`;
        let enl = schema.encryptLicense(result);
        enl.license_qr = licenseQRPath;
        enl.machine_qr = machineQRPath;

        res.status(200).send(enl);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] Get License By Company
LicenseRoutes.route(path + '/manage/by-company/:company_id').get(async (req, res) => {
    try {
        let company_id = req.params.company_id;

        const schema = new LicenseSchema();
        const result = await schema.adminGetByCompany(company_id);

        const deviceSchema = new DeviceSchema();
        const devices = await deviceSchema.adminGetByCompany(company_id);

        const dtos: DTOLicense[] = [];

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const item = result[i];
                let enl = schema.encryptLicense(item);
                const dvs = devices.filter(val => val.license_id == item.id);
                const dto = new DTOLicense(item, enl, dvs);
                dtos.push(dto);
            }
        }

        res.status(200).send(dtos);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] Get License + encryption + QRCode
LicenseRoutes.route(path + '/manage/encrypt/:license_id').get(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        let result: License = await schema.get(license_id);

        if (result) {
            const licenseQRPath = `${req.protocol}://${req.get('host')}/api${path}/qrcode/${result.id}`;
            const machineQRPath = `${req.protocol}://${req.get('host')}/api/machine/${result.machine_id}/qrcode`;
            let enl = schema.encryptLicense(result);
            enl.license_qr = licenseQRPath;
            enl.machine_qr = machineQRPath;

            res.status(200).send(enl);
        } else {
            res.status(404).send('License key not found.');
        }
    } catch (error) {
        res.status(400).send(`ERR: ${error}`);
    }
});

//[ADMIN] Get License + encryption + QRCode
LicenseRoutes.route(path + '/manage/encrypt/:license_id/base64').get(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        let result: License = await schema.get(license_id);

        if (result) {
            let enl = schema.encryptLicense(result);

            QRCode.toDataURL(enl.cipher, (err: any, url: any) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    enl.license_qr = url;
                    QRCode.toDataURL(result.machine_serial_no, (err2: any, url2: any) => {
                        if (err) {
                            res.status(400).send(err2);
                        } else {
                            enl.machine_qr = url2;
                            res.status(200).send(enl);
                        }
                    });
                }
            });
        } else {
            res.status(404).send('License key not found.');
        }
    } catch (error) {
        res.status(400).send(`ERR: ${error}`);
    }
});


//[ADMIN] Update License
LicenseRoutes.route(path + '/manage/update/:license_id').put(async (req, res) => {
    try {
        let license_id = req.params.license_id;
        let data = req.body;

        const schema = new LicenseSchema();
        const result = await schema.update(license_id, data);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] Delete License
LicenseRoutes.route(path + '/manage/delete/:license_id').delete(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        await schema.delete(license_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(`ERR: ${error}`);

    }
});



//[ANY] GENERATE QR CODE
LicenseRoutes.route(path + '/qrcode/:license_id').get(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        const license = await schema.get(license_id);
        const result = schema.encryptLicense(license);

        QRCode.toDataURL(result.cipher, (err: any, url: any) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(`<html><body><img src="${url}"/></body></html>`);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ANDROID] SCAN QR --> SENDS CIPHER TO API --> API SENDS BACK LICENSE DATA
LicenseRoutes.route(path + '/decrypt').post(async (req, res) => {
    try {
        let encrypted = req.body as EncryptedLicense;

        const schema = new LicenseSchema();
        const result = schema.decryptLicense(encrypted.cipher, encrypted.key);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ANDROID] ACTIVATE LICENSE
LicenseRoutes.route(path + '/activate').post(async (req, res) => {
    try {
        let dto = new DTOEncryptedLicense(req.body);

        const schema = new LicenseSchema();
        const decryptedLcn = schema.decryptLicense(dto.cipher, dto.key);

        if(decryptedLcn){
            const validatedLcn: License = await schema.get(decryptedLcn.id);
            const machineSchema = new MachineSchema();
            const machine: Machine = await machineSchema.get(decryptedLcn.machine_id);
    
            if (validatedLcn && machine) {
                const deviceSchema = new DeviceSchema();
                const devices: Device[] = await deviceSchema.getByLicense(validatedLcn.id);

                let resDevice = await deviceSchema.getByLicenseAndMac(validatedLcn.id, dto.deviceMacAddr);

                if(devices.length < machine.device_limit){
                    const isExpired = schema.isExpired(validatedLcn);
                    if(!isExpired.bool){
                        const newDevice: Device = {
                            company_id: machine.company_id,
                            machine_id: machine.id,
                            license_id: validatedLcn.id,
                            visible: true,
                            mac_address: dto.deviceMacAddr,
                            type: dto.type,
                            os: dto.os,
                            model: dto.model,
                        };
    
                        if(!resDevice){
                            resDevice = (await deviceSchema.create(newDevice, true))[0];
                            if(resDevice.visible){
                                res.status(200).send({
                                    header: 'License Activated Successfully.',
                                    license: validatedLcn,
                                    device: resDevice
                                });
                            }else{
                                res.status(403).send({
                                    header: 'Device Temporarily Disabled',
                                    message: `Your device has been temporarily disabled by admin. Please contact support.`
                                });
                            }
                        }else{
                            res.status(200).send({
                                header: 'License Activated Successfully.',
                                license: validatedLcn,
                                device: resDevice
                            });
                        }
                    }else{
                        res.status(406).send({
                            header: 'License Expired',
                            message: `This license has been expired for ${isExpired.exceed} days.`
                        });
                    }
                }else{
                    if(resDevice && !resDevice.visible){
                        res.status(403).send({
                            header: 'Device Temporarily Disabled',
                            message: `Your device has been temporarily disabled by admin. Please contact support.`
                        });
                    }else{
                        res.status(401).send({
                            header: 'Device Limit Exceed',
                            message: 'This license device limit has been exceed.'
                        });
                    }
                }
            } else {
                res.status(404).send({
                    header: 'License Not Found.',
                    message: 'license or machine not found on the server.'
                });
            }
        }else{
            res.status(404).send({
                header: 'Invalid License',
                message: 'license or machine are invalid.'
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ANDROID] DE-ACTIVATE LICENSE
LicenseRoutes.route(path + '/deactivate').delete(async (req, res) => {
    try {
        let dto = new DTODeactivate(req.body);

        const deviceSchema = new DeviceSchema();
        await deviceSchema.deleteByLicenseAndMac(dto.licenseId, dto.macAddress);

        res.status(200).send('License de-activated on your device.')
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ANDROID] REALTIME VALIDATE LICENSE
LicenseRoutes.route(path + '/validate').put(async (req, res) => {
    try {
        let dto = new DTOEncryptedLicense(req.body);

        const schema = new LicenseSchema();
        const decryptedLcn = schema.decryptLicense(dto.cipher, dto.key);

        if(decryptedLcn){
            const validatedLcn: License = await schema.get(decryptedLcn.id);
            const machineSchema = new MachineSchema();
            const machine: Machine = await machineSchema.get(decryptedLcn.machine_id);
    
            if (validatedLcn && machine) {
                const deviceSchema = new DeviceSchema();
                const devices: Device[] = await deviceSchema.getByLicense(validatedLcn.id);
                let resDevice = await deviceSchema.getByLicenseAndMac(validatedLcn.id, dto.deviceMacAddr);

                if(devices.length < machine.device_limit){
                    const isExpired = schema.isExpired(validatedLcn);
                    if(!isExpired.bool){
                        if(!resDevice){
                            res.status(410).send({
                                header: 'Device De-activated.',
                                message: 'Your device has been de-activated by admin recently.'
                            });
                        }else{
                            if(resDevice.visible){
                                res.status(200).send({
                                    header: 'License Validated.',
                                    message: 'Your license has been validated with your device.'
                                });
                            }else{
                                res.status(403).send({
                                    header: 'Device Temporarily Disabled',
                                    message: `Your device has been temporarily disabled by admin. Please contact support.`
                                });
                            }
                        }
                    }else{
                        res.status(406).send({
                            header: 'License Expired',
                            message: `This license has been expired for ${isExpired.exceed} days.`
                        });
                    }
                }else{
                    if(resDevice && !resDevice.visible){
                        res.status(403).send({
                            header: 'Device Temporarily Disabled',
                            message: `Your device has been temporarily disabled by admin. Please contact support.`
                        });
                    }else{
                        res.status(401).send({
                            header: 'Device Limit Exceed',
                            message: 'This license device limit has been exceed.'
                        });
                    }
                }
            } else {
                res.status(404).send({
                    header: 'License Not Found.',
                    message: 'license or machine not found on the server.'
                });
            }
        }else{
            res.status(404).send({
                header: 'Invalid License',
                message: 'license or machine are invalid.'
            });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

