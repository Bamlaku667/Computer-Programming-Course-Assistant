import 'express-async-errors';
import express, { Application } from "express";
import { AuthRoutes, StudentRoutes } from "../routes";
import cors from 'cors';
import errorHandler from '../middlewares/errorHandler';
const App = async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('course-assisstant!');
    })
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/v1/auth', AuthRoutes)
    app.use('/api/v1/student', StudentRoutes)

    app.use(errorHandler)

    return app;
}

export default App;