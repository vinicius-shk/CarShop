import IMotorcycle, { Categories } from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: Categories;
  private engineCapacity: number;

  constructor(obj: IMotorcycle) {
    super(obj);
    this.category = obj.category;
    this.engineCapacity = obj.engineCapacity;
  }
}