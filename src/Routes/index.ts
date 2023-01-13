import express from 'express';
import CarController from '../Controllers/CarController';

const carRouter = express.Router();

carRouter.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

export default carRouter;