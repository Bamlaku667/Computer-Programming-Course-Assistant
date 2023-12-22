import bodyParser from "body-parser";
import express, { Application } from "express";
import { AuthRoutes } from "../routes";
const App = async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('hello express');
    })
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/api/v1/auth', AuthRoutes)

    return app;
}

export default App;