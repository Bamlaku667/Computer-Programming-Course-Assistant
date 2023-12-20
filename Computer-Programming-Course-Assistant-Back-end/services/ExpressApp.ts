import bodyParser from "body-parser";
import express, { Application } from "express";
import { AuthRoutes } from "../routes";
const App = (app: Application) => {
    app.use(express.json())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        res.send('hello express');
    })

    app.use('api/v1/auth', AuthRoutes)
}

export default App;