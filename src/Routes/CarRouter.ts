import express from 'express';
import CarController from '../Controllers/CarController';

const carRouter = express.Router();

carRouter.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

carRouter.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findById(),
);

carRouter.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAll(),
);

carRouter.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

export default carRouter;