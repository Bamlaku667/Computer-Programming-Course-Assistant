import bodyParser from "body-parser";
import express, { Application } from "express";
import { AuthRoutes, StudentRoutes } from "../routes";
import cors from 'cors';
const App = async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('hello students!');
    })
    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    app.use('/api/v1/auth', AuthRoutes)
    app.use('/api/v1/student', StudentRoutes)

    return app;
}

export default App;