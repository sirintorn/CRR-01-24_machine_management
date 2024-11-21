import { VolumeCalibrationTarget } from "../models/m_volume_calibration_target";
import { DTO } from "./dto";

export class DTOVolumeCalibrationTarget extends DTO{
    id?: any;
    tinting_profile_id?: any;
    target_ml?: number;
    target_err_rate?: number;
    repeat?: number;

    constructor(body: VolumeCalibrationTarget){
        super();
        this.id = body.id;
        this.tinting_profile_id = body.tinting_profile_id;
        this.target_ml = body.target_ml;
        this.target_err_rate = body.target_err_rate;
        this.repeat = body.repeat;
    }

    static convert(dto: DTOVolumeCalibrationTarget): VolumeCalibrationTarget{
        return dto as VolumeCalibrationTarget;
    }
}