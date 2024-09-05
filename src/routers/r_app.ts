import { Router } from "express";

export const AppRoute = Router();

const path = '/app';

// display simple id form GET
AppRoute.route(path + '/:id').get(async (req, res) => {
    try {
        const id = req.params.id;
        const result = `Param id is ${id}`;

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

// display simple body date from POST
AppRoute.route(path).post(async (req, res) => {
    try {
        const data = req.body;
        const result = "Your data:" + JSON.stringify(data);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).send(error);
    }
})