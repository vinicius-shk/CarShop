import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpError from '../Utils/HttpError';

export default class MotorcycleService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async register(data: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(data);
    return this.createMotoDomain(newMoto);
  }

  public async findAll() {
    const motoODM = new MotorcycleODM();
    const motoList = await motoODM.findAll();
    const domainList = motoList.map((moto) => this.createMotoDomain(moto));
    return domainList;
  }

  public async findById(id: string) {
    const motoODM = new MotorcycleODM();
    if (id.length !== 24) throw new HttpError(422, 'Invalid mongo id');
    const motoById = await motoODM.findById(id);
    if (!motoById) throw new HttpError(404, 'Motorcycle not found');
    return this.createMotoDomain(motoById);
  }

  public async updateById(id: string, obj: IMotorcycle) {
    const motoODM = new MotorcycleODM();  
    if (id.length !== 24) throw new HttpError(422, 'Invalid mongo id');
    const motoResponse = await motoODM.update(id, obj);
    if (!motoResponse) throw new HttpError(404, 'Motorcycle not found');
    return this.createMotoDomain(motoResponse);
  }
}