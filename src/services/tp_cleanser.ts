import { AccuracyTestTargetSchema } from "../models/m_accuracy_test_targets";
import { CalibrationInfoSchema } from "../models/m_calibration_infos";
import { CircuitInfoSchema } from "../models/m_circuit_infos";
import { StepCalibrationTargetSchema } from "../models/m_step_calibration_target";
import { TintingProfileSchema } from "../models/m_tinting_profiles";
import { VolumeCalibrationTargetSchema } from "../models/m_volume_calibration_target";

export class TPCleanser{
    static async clearDB(tinting_profile_id: any,
        tintingProfileSCH: TintingProfileSchema,
        circuitInfoSCH: CircuitInfoSchema,
        calibrationInfoSCH: CalibrationInfoSchema,
        volumeCalibrationTargetSCH: VolumeCalibrationTargetSchema,
        stepCalibrationTargetSCH: StepCalibrationTargetSchema,
        accuracyTestTargetSCH: AccuracyTestTargetSchema,
    ) {
        await tintingProfileSCH.forceDelete(tinting_profile_id);
        await circuitInfoSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await calibrationInfoSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await volumeCalibrationTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await stepCalibrationTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
        await accuracyTestTargetSCH.forceDeleteByTintingProfile(tinting_profile_id);
    }
}