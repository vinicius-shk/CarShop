import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const carMessage = 'Car not found';
const idMessage = 'Invalid mongo id';

describe('Test suit for cars', function () {
  it('Should register a car on correct request', async function () {
    const carBody: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const registerOutput: Car = new Car(carBody);
    sinon.stub(Model, 'create').resolves(registerOutput);

    const service = new CarService();
    const result = await service.register(carBody);

    expect(result).to.be.deep.equal(registerOutput);
  });
  it('Should list all cars ', async function () {
    const carList: ICar[] = [
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
    sinon.stub(Model, 'find').resolves(carList);

    const service = new CarService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(carList);
  });
  it('Should list a car by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const carById: ICar = {
      id: '63c58cf07f367d16a9b6463d',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      seatsQty: 5,
      doorsQty: 4,
    };
    sinon.stub(Model, 'findOne').resolves(carById);

    const service = new CarService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal(carById);
  });
  it('Should return 422 on invalid id', async function () {
    const id = '63c58cf07f367d16a9b663d';

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });
  it('Should return 404 on inexisting id', async function () {
    const id = '63c58cf07f367d16a9b663ad';

    sinon.stub(Model, 'findOne').resolves(undefined);

    try {
      const service = new CarService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(carMessage);
    }
  });
  it('Should update existing car by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const reqBody:ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };
    const resolveUpdate = {
      id: '63c58cf07f367d16a9b6463d',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(resolveUpdate);

    const service = new CarService();
    const response = await service.updateById(id, reqBody);
    expect(response).to.be.deep.equal(resolveUpdate);
  });
  it('Should return 422 on update with invalid id', async function () {
    const id = '63c58cf07f367d16a9b663d';
    const reqBody:ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.updateById(id, reqBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });
  it('Should return 404 on update with inexisting id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const reqBody:ICar = {
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOneAndUpdate').resolves(undefined);

    try {
      const service = new CarService();
      await service.updateById(id, reqBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(carMessage);
    }
  });
  it('Should delete existing car by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const resolveUpdate: ICar = {
      id: '63c58cf07f367d16a9b6463d',
      model: 'Marea',
      year: 1992,
      color: 'Red',
      status: true,
      buyValue: 12.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findByIdAndDelete').resolves(resolveUpdate);

    const service = new CarService();
    const response = await service.delete(id);
    
    expect(response).to.be.deep.equal(resolveUpdate);
  });
  it('Should not delete non-existing id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    try {
      const service = new CarService();
      await service.delete(id);  
    } catch (e) {
      expect((e as Error).message).to.be.deep.equal(carMessage);
    }
  });
  it('Should not delete invalid existing id', async function () {
    const id = '63c58cf07f367d16a9d';

    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    try {
      const service = new CarService();
      await service.delete(id);  
    } catch (e) {
      expect((e as Error).message).to.be.deep.equal(idMessage);
    }
  });
  afterEach(function () {
    sinon.restore();
  });
});