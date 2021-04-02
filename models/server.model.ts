import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/user.routes';
import dbConnection from '../db/config';

interface Path {
    usuarios: string
}

class Server {
    private app: Application;
    private port: string;
    private paths: Path;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.paths = {
            usuarios: '/api/usuarios'
        }

        this.listen();
        this.conectarDB();
        this.middlewares();
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.paths.usuarios, userRoutes);
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

}

export default Server;