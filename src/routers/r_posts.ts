import { Router } from "express";
import { Post, PostSchema } from "../models/m_posts";

export const PostRoute = Router();

const path = '/posts';

//สำหรับเรียกข้อมูลโพสต์ ที่ user ใดๆ เป็นเจ้าของ
PostRoute.route(path + '/by-user' + '/:user_id').get(async (req, res) => {
    try {
        const user_id: string = req.params.user_id;

        const schema = new PostSchema();
        const result = await schema.getByUser(user_id);

        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
});

//สำหรับสร้างโพสต์
PostRoute.route(path).post(async (req, res) => {
    try {
        const data: Post = req.body;

        const schema = new PostSchema();
        const result = await schema.create(data, true);
        
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
});

//สำหรับแก้ไขโพสต์
PostRoute.route(path + '/:post_id').put(async (req, res) => {
    try {
        const post_id: string = req.params.post_id;
        const data: Post = req.body;

        const schema = new PostSchema();
        const result = await schema.update(post_id, data);
        
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error)
    }
});

//สำหรับลบโพสต์
PostRoute.route(path + '/:post_id').delete(async (req, res) => {
    try {
        const post_id: string = req.params.post_id;

        const schema = new PostSchema();
        const result = await schema.forceDelete(post_id);
        
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error)
    }
});
