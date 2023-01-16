import express from 'express';
import CarController from '../Controllers/CarController';

const carRouter = express.Router();
const routeById = '/cars/:id';

carRouter.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

carRouter.get(
  routeById,
  (req, res, next) => new CarController(req, res, next).findById(),
);

carRouter.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).findAll(),
);

carRouter.put(
  routeById,
  (req, res, next) => new CarController(req, res, next).updateById(),
);

carRouter.delete(
  routeById,
  (req, res, next) => new CarController(req, res, next).delete(),
);

export default carRouter;