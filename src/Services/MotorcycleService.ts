import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
// import HttpError from '../Utils/HttpError';

export default class MotorcycleService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async register(data: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newCar = await motoODM.create(data);
    return this.createMotoDomain(newCar);
  }
}