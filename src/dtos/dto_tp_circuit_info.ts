import { CircuitInfo } from "../models/m_circuit_infos";
import { DTO } from "./dto";

export class DTOCircuitInfo extends DTO{
    id?: any;
    tinting_profile_id?: any;
    enabled?: boolean;
    index?: number;
    tinter_code?: string;
    tinter_name?: string;
    r?: number;
    g?: number;
    b?: number;
    sg?: number;
    max_level?: number;
    refill_level?: number;
    cutoff_level?: number;
    current_level?: number;

    constructor(body: CircuitInfo){
        super();
        this.id = body.id;
        this.tinting_profile_id = body.tinting_profile_id;
        this.enabled = body.enabled;
        this.index = body.index;
        this.tinter_code = body.tinter_code;
        this.tinter_name = body.tinter_name;
        this.r = body.r;
        this.g = body.g;
        this.b = body.b;
        this.sg = body.sg;
        this.max_level = body.max_level;
        this.refill_level = body.refill_level;
        this.cutoff_level = body.cutoff_level;
        this.current_level = body.current_level;
    }

    static convert(dto: DTOCircuitInfo): CircuitInfo{
        return dto as CircuitInfo;
    }
}