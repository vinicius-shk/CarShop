import express from 'express';
import { carRouter, motorcycleRouter } from './Routes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRouter);
app.use(ErrorHandler.handle);

export default app;
