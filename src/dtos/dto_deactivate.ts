export class DTODeactivate{
    licenseId: string;
    macAddress: string;

    constructor(body: any){
        this.licenseId = body.licenseId; 
        this.macAddress = body.macAddress;
    }
}