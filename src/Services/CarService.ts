import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpError from '../Utils/HttpError';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
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
    if (id.length !== 24) throw new HttpError(422, 'Invalid mongo id');
    const carResponse = await carODM.findById(id);
    if (!carResponse) throw new HttpError(404, 'Car not found');
    return this.createCarDomain(carResponse);
  }
}