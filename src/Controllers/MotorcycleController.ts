import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      ...this.req.body,
    };

    try {
      const newMoto = await this.service.register(moto);
      return this.res.status(201).json(newMoto);
    } catch (e) {
      this.next(e);
    }
  }
}