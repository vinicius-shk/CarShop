import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(obj: ICar) {
    super(obj);
    this.seatsQty = obj.seatsQty;
    this.doorsQty = obj.doorsQty;
  }
}