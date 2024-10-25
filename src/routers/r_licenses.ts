import { Router } from "express";
import { EncryptedLicense, License, LicenseSchema } from "../models/m_licenses";
import QRCode from 'qrcode';
import { DTOLicense } from "../dtos/dto_license";

export const LicenseRoutes = Router();

const path = '/licenses';

LicenseRoutes.route(path + '/test/encrypt').post(async (req, res) => {
    try {
        let license = req.body as License;

        const schema = new LicenseSchema();
        let result = schema.encryptLicense(license);
        result.qrcode = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

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
        let dto = new DTOLicense(result);
        let enl = schema.encryptLicense(dto);
        enl.qrcode = `${req.protocol}://${req.get('host')}/api${path}/qrcode/${result.id}`;

        res.status(200).send(enl);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[ADMIN] Update License
LicenseRoutes.route(path + '/manage/:license_id').put(async (req, res) => {
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
LicenseRoutes.route(path + '/manage/:license_id').delete(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        const result = await schema.delete(license_id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});


//[ANY] GENERATE QR CODE
LicenseRoutes.route(path + '/qrcode/:license_id').get(async (req, res) => {
    try {
        let license_id = req.params.license_id;

        const schema = new LicenseSchema();
        const license = await schema.get(license_id);
        const dto = new DTOLicense(license);
        const result = schema.encryptLicense(dto);

        QRCode.toDataURL(result.cipher, (err: any, url: any) => {
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



