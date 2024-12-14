import { DEVICE_OS, DEVICE_TYPES } from "../models/m_devices";

export class DTOEncryptedLicense{
    cipher: string;
    key: string;
    deviceMacAddr: string;
    type?: string;
    os?: string;
    model?: string;

    constructor(body: any){
        this.cipher = body.cipher ?? '';
        this.key = body.key ?? '';
        this.deviceMacAddr = body.deviceMacAddr ?? '';
        this.type = body.type ?? DEVICE_TYPES.others;
        this.os = body.os ?? DEVICE_OS.others;
        this.model = body.model ?? '';
    }
}