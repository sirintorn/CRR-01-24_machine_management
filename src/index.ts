import { routes } from './routers';
import express, { Request } from 'express';
import dotenv from 'dotenv';

const app = express();


import cors from 'cors';
app.use(cors<Request>());

// parses incoming requests with JSON payloads
app.use(express.json()); 

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true })); 

//ALLOW GETTING CLIENT'S IP ADDRESS
app.set('trust proxy', true);

dotenv.config(); //config to read .env file
const ENV = process.env.NODE_ENV as string;
const API = process.env.API as string;
const PORT = Number(process.env.PORT);
const NAME = process.env.NAME as string;

async function onStart() {
    try {
        console.log(`Server running on port ${PORT} - ENV: ${ENV} - Project: ${NAME}`);
    } catch (error: any) {
        console.log(error);
    }
}

app.listen(PORT, onStart);
app.use(API, routes);