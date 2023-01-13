import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      ...this.req.body,
    };

    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (e) {
      this.next(e);
    }
  }

  public async findAll() {
    try {
      const carList = await this.service.findAll();
      return this.res.status(200).json(carList);
    } catch (e) {
      this.next(e);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const carById = await this.service.findById(id);
      if (!carById) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(carById);
    } catch (e) {
      this.next(e);
    }
  }
}