import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './services/DataBase';
import App from './services/ExpressApp';
dotenv.config();


const { PORT } = process.env;
const port = PORT || 3000

const startServer = async () => {
    const app = express();
    await connectToDB();
    await App(app);
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
}

startServer();