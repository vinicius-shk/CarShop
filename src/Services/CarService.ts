import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpError from '../Utils/HttpError';

const error422 = 'Invalid mongo id';
const error404 = 'Car not found';

export default class CarService {
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async register(data: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(data);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const carList = await carODM.findAll();
    const carDomainList = carList.map((car) => this.createCarDomain(car));
    return carDomainList;
  }

  public async findById(id: string) {
    const carODM = new CarODM();  
    if (id.length !== 24) throw new HttpError(422, error422);
    const carResponse = await carODM.findById(id);
    if (!carResponse) throw new HttpError(404, error404);
    return this.createCarDomain(carResponse);
  }

  public async updateById(id: string, obj: ICar) {
    const carODM = new CarODM();  
    if (id.length !== 24) throw new HttpError(422, error422);
    const carResponse = await carODM.update(id, obj);
    if (!carResponse) throw new HttpError(404, error404);
    return this.createCarDomain(carResponse);
  }

  public async delete(id: string) {
    const carODM = new CarODM();
    if (id.length !== 24) throw new HttpError(422, error422);
    const carResponse = await carODM.delete(id);
    if (!carResponse) throw new HttpError(404, error404);
    return this.createCarDomain(carResponse);
  }
}