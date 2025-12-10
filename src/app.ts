import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import {Server} from "socket.io";
import { connectDB } from '../src/configuracion/db';
;
import {initSocket} from "./infraestructura/sockets/SocketService";

export const app = express();
export const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});


connectDB();

app.use(cors());
app.use(express.json());

initSocket(io);