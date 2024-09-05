import { Router } from "express";
import { UserSchema } from "../models/m_users";

export const UserRouter = Router();

const path = '/users';

UserRouter.route(path + '/login').post(async (req, res) => {
    try {
        const username: string = req.body.username ?? '';
        const password: string = req.body.password ?? '';

        const schema = new UserSchema();
        const result = await schema.login(username, password);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

UserRouter.route(path + '/register').post(async (req, res) => {
    try {
        const username: string = req.body.username ?? '';
        const password: string = req.body.password ?? '';

        const schema = new UserSchema();
        const result = await schema.register(username, password);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
});