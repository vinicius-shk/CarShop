import IVehicle from './IVehicle';

export type Categories = 'Street' | 'Custom' | 'Trail';

export default interface IMotorcycle extends IVehicle {
  category: Categories;
  engineCapacity: number;
}