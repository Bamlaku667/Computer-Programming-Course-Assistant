import 'express-async-errors';
import express, { Application } from 'express';
import { AuthRoutes, InstructorRoutes, StudentRoutes } from '../routes';
import cors from 'cors';
import { AdminRoutes } from '../routes/AdminRoutes';
import { errorHandler } from '../middlewares';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan'; 

const App = async (app: Application) => {
<<<<<<< HEAD
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
    app.use('/api/v1/auth', AuthRoutes)
    app.use('/api/v1/student', StudentRoutes)
    app.use('/api/v1/admin', AdminRoutes)
    app.use('/api/v1/instructor', InstructorRoutes)
=======
  // Construct the correct path to swagger.yaml
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
>>>>>>> main

  // app.get('/', (req, res) => {
  //   res.send('<h1>Course Assistant API</h1><a href="/api-docs">Documentation</a>');
  // });
  app.use(express.static(path.join(__dirname, "../public")));  
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'))
  app.use(express.urlencoded({ extended: true }));
  
  
  // Use /tmp directory for temporary image storage
  const imagesPath = '/tmp/images';
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
  }
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/images', express.static(imagesPath));
  app.use('/api/v1/auth', AuthRoutes);
  app.use('/api/v1/student', StudentRoutes);
  app.use('/api/v1/admin', AdminRoutes);
  app.use('/api/v1/instructor', InstructorRoutes);

  app.use(errorHandler);

  return app;
};

export default App;
