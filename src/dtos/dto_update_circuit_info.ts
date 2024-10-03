import { DTO } from "./dto";

export class DTOUpdateCircuitInfo extends DTO{
    enabled: boolean;
    index: number;
    tinter_code: string;
    tinter_name: string;
    r: number;
    g: number;
    b: number;
    sg: number;
    max_level: number;
    refill_level: number;
    cutoff_level: number;
    current_level: number;
    updated_by: string;

    constructor(data: any){
        super();
        this.enabled = data.enabled ?? false;
        this.index = data.index ?? -99;
        this.tinter_code = data.tinter_code ?? '-';
        this.tinter_name = data.tinter_name ?? '-';
        this.r = data.r ?? 0;
        this.g = data.g ?? 0;
        this.b = data.b ?? 0;
        this.sg = data.dg ?? 0;
        this.max_level = data.max_level ?? 0;
        this.refill_level = data.refill_level ?? 0;
        this.cutoff_level = data.cutoff_level ?? 0;
        this.current_level = data.current_level ?? 0;
        this.updated_by = data.updated_by ?? null;
    }
}