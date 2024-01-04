import 'express-async-errors';
import express, { Application } from "express";
import { AuthRoutes, InstructorRoutes, StudentRoutes } from "../routes";
import cors from 'cors';
import { AdminRoutes } from '../routes/AdminRoutes';
import { errorHandler } from '../middlewares';
import path from 'path'
import fs from 'fs'
const App = async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('course-assisstant-api-works!');
    })
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    const imagesPath = path.resolve(__dirname, '../images');
    if (!fs.existsSync(imagesPath)) {
        fs.mkdirSync(imagesPath);
    }
    app.use('/images', express.static(imagesPath));

    app.use('/api/v1/auth', AuthRoutes)
    app.use('/api/v1/student', StudentRoutes)
    app.use('/api/v1/admin', AdminRoutes)
    app.use('/api/v1/instructor', InstructorRoutes)

    app.use(errorHandler)

    return app;
}

export default App;