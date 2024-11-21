import { AccuracyTestTarget } from "../models/m_accuracy_test_targets";
import { DTO } from "./dto";

export class DTOAccuracyTestTarget extends DTO{
    id?: any;
    tinting_profile_id?: any;
    target_ml?: number;
    repeat?: number;

    constructor(body: AccuracyTestTarget){
        super();
        this.id = body.id;
        this.tinting_profile_id = body.tinting_profile_id;
        this.target_ml = body.target_ml;
        this.repeat = body.repeat;
    }

    static convert(dto: DTOAccuracyTestTarget): AccuracyTestTarget{
        return dto as AccuracyTestTarget;
    }
}