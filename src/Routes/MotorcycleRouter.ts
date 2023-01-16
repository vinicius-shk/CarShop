import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = express.Router();
const routeById = '/motorcycles/:id';

motorcycleRouter.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

motorcycleRouter.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).findAll(),
);

motorcycleRouter.get(
  routeById,
  (req, res, next) => new MotorcycleController(req, res, next).findById(),
);

motorcycleRouter.put(
  routeById,
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

motorcycleRouter.delete(
  routeById,
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

export default motorcycleRouter;