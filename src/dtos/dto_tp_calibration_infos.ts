import { CalibrationInfo } from "../models/m_calibration_infos";
import { DTO } from "./dto";

export class DTOCalibrationInfo extends DTO{
    id?: any;
    tinting_profile_id?: any;
    index?: number;
    tinter_code?: string;
    tinter_name?: string;
    target_ml?: number;
    target_err_rate?: number;
    repeat?: number;
    result_step?: number;
    result_ml?: number;
    result_g?: number;
    result_err_rate?: number;
    status?: string;
    created?: any;
    modified?: any;

    constructor(body: CalibrationInfo){
        super();
        this.id = body.id;
        this.tinting_profile_id = body.tinting_profile_id;
        this.index = body.index;
        this.tinter_code = body.tinter_code;
        this.tinter_name = body.tinter_name;
        this.target_ml = body.target_ml;
        this.target_err_rate = body.target_err_rate;
        this.repeat = body.repeat;
        this.result_step = body.result_step;
        this.result_ml = body.result_ml;
        this.result_g = body.result_g;
        this.result_err_rate = body.result_err_rate;
        this.status = body.status;
        this.created = body.created;
        this.modified = body.modified;
    }

    static convert(dto: DTOCalibrationInfo): CalibrationInfo{
        return dto as CalibrationInfo;
    }
}