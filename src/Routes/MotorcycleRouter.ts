import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = express.Router();

motorcycleRouter
  .post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());

export default motorcycleRouter;