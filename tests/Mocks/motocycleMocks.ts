import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const model = 'Honda Cb 600f Hornet';

export const motoMessage = 'Motorcycle not found';
export const idMessage = 'Invalid mongo id';

export const motoBody: IMotorcycle = {
  model,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const findAllOutput: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
];

export const findByIdOutput: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};