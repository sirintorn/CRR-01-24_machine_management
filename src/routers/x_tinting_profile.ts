import { Router } from "express";
import { AccuracyTestTargetSchema } from "../models/m_accuracy_test_targets";
import { CalibrationInfoSchema } from "../models/m_calibration_infos";
import { CircuitInfoSchema } from "../models/m_circuit_infos";
import { StepCalibrationTargetSchema } from "../models/m_step_calibration_target";
import { VolumeCalibrationTargetSchema } from "../models/m_volume_calibration_target";
import { DTOAccuracyTestTarget } from "../dtos/dto_tp_accuracy_test_targets";
import { DTOCalibrationInfo } from "../dtos/dto_tp_calibration_infos";
import { DTOCircuitInfo } from "../dtos/dto_tp_circuit_info";
import { DTOStepCalibrationTarget } from "../dtos/dto_tp_step_calibration_target";
import { DTOVolumeCalibrationTarget } from "../dtos/dto_tp_volume_calibration_target";

export const XTintingProfileRoutes = Router();

const path = '/x-tinting-profile';

//[UPDATE] ACCURACY TEST TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/accuracy-test-target/:item_id').put(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        let body = req.body as DTOAccuracyTestTarget;

        const schema = new AccuracyTestTargetSchema();
        const result = await schema.update(item_id, body);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[UPDATE] CALIBRATION INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/calibration-info/:item_id').put(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        let body = req.body as DTOCalibrationInfo;

        const schema = new CalibrationInfoSchema();
        const result = await schema.update(item_id, body);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[UPDATE] CIRCUIT INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/circuit-info/:item_id').put(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        let body = req.body as DTOCircuitInfo;

        const schema = new CircuitInfoSchema();
        const result = await schema.update(item_id, body);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[UPDATE] STEP CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/step-calibration-target/:item_id').put(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        let body = req.body as DTOStepCalibrationTarget;

        const schema = new StepCalibrationTargetSchema();
        const result = await schema.update(item_id, body);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[UPDATE] VOLUME CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/volume-calibration-target/:item_id').put(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        let body = req.body as DTOVolumeCalibrationTarget;

        const schema = new VolumeCalibrationTargetSchema();
        const result = await schema.update(item_id, body);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});



//[DELETE] ACCURACY TEST TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/accuracy-test-target/:item_id').delete(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        const schema = new AccuracyTestTargetSchema();
        const result = await schema.delete(item_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//[DELETE] CALIBRATION INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/calibration-info/:item_id').delete(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        const schema = new CalibrationInfoSchema();
        const result = await schema.delete(item_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//[DELETE] CIRCUIT INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/circuit-info/:item_id').delete(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        const schema = new CircuitInfoSchema();
        const result = await schema.delete(item_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//[DELETE] STEP CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/step-calibration-target/:item_id').delete(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        const schema = new StepCalibrationTargetSchema();
        const result = await schema.delete(item_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});

//[DELETE] VOLUME CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/volume-calibration-target/:item_id').delete(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;
        const item_id = req.params.item_id;

        const schema = new VolumeCalibrationTargetSchema();
        const result = await schema.delete(item_id);

        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
});



//[CREATE] ACCURACY TEST TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/accuracy-test-target').post(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;

        let body = req.body as DTOAccuracyTestTarget;
        body.tinting_profile_id = tinting_profile_id;

        const schema = new AccuracyTestTargetSchema();
        const result = await schema.create(body, true);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[CREATE] CALIBRATION INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/calibration-info').post(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;

        let body = req.body as DTOCalibrationInfo;
        body.tinting_profile_id = tinting_profile_id;

        const schema = new CalibrationInfoSchema();
        const result = await schema.create(body, true);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[CREATE] CIRCUIT INFO
XTintingProfileRoutes.route(path + '/:tinting_profile_id/circuit-info').post(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;

        let body = req.body as DTOCircuitInfo;
        body.tinting_profile_id = tinting_profile_id;

        const schema = new CircuitInfoSchema();
        const result = await schema.create(body, true);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[CREATE] STEP CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/step-calibration-target').post(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;

        let body = req.body as DTOStepCalibrationTarget;
        body.tinting_profile_id = tinting_profile_id;

        const schema = new StepCalibrationTargetSchema();
        const result = await schema.create(body, true);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

//[CREATE] VOLUME CALIBRATION TARGET
XTintingProfileRoutes.route(path + '/:tinting_profile_id/volume-calibration-target').post(async (req, res) => {
    try {
        const tinting_profile_id = req.params.tinting_profile_id;

        let body = req.body as DTOVolumeCalibrationTarget;
        body.tinting_profile_id = tinting_profile_id;

        const schema = new VolumeCalibrationTargetSchema();
        const result = await schema.create(body, true);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});


