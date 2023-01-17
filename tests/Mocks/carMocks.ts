import ICar from '../../src/Interfaces/ICar';

export const carMessage = 'Car not found';
export const idMessage = 'Invalid mongo id';

export const carBody: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};

export const carList: ICar[] = [
  {
    id: '63c58cf07f367d16a9b6463d',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    seatsQty: 5,
    doorsQty: 4,
  },
  {
    id: '63c58e4a7f367d16a9b64640',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    seatsQty: 5,
    doorsQty: 4,
  },
];

export const carByIdOutput: ICar = {
  id: '63c58cf07f367d16a9b6463d',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  seatsQty: 5,
  doorsQty: 4,
};