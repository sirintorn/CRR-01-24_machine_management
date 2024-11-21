import { StepCalibrationTarget } from "../models/m_step_calibration_target";
import { DTO } from "./dto";

export class DTOStepCalibrationTarget extends DTO{
    id?: any;
    tinting_profile_id?: any;
    target_step?: number;
    target_err_rate?: number;
    repeat?: number;

    constructor(body: StepCalibrationTarget){
        super();
        this.id = body.id;
        this.tinting_profile_id = body.tinting_profile_id;
        this.target_step = body.target_step;
        this.target_err_rate = body.target_err_rate;
        this.repeat = body.repeat;
    }

    static convert(dto: DTOStepCalibrationTarget): StepCalibrationTarget{
        return dto as StepCalibrationTarget;
    }
}