import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Test suit for motorcycles', function () {
  it('Should register a motorcycle on correct request', async function () {
    const motoBody: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const registerOutput: Motorcycle = new Motorcycle(motoBody);
    sinon.stub(Model, 'create').resolves(registerOutput);

    const service = new MotorcycleService();
    const result = await service.register(motoBody);

    expect(result).to.be.deep.equal(registerOutput);
  });
  // it('Should list all motorcycles', async function () {
  //   const output = [
  //     {
  //       id: '634852326b35b59438fbea2f',
  //       model: 'Honda Cb 600f Hornet',
  //       year: 2005,
  //       color: 'Yellow',
  //       status: true,
  //       buyValue: 30.000,
  //       category: 'Street',
  //       engineCapacity: 600,
  //     },
  //   ];
  //   sinon.stub(Model, 'find').resolves(output);

  //   const service = new MotorcycleService();
  //   const result = await service.findAll();

  //   expect(result).to.be.deep.equal(output);
  // });
  // it('Should list one motorcycle by id', async function () {
  //   const id = '634852326b35b59438fbea2f';
  //   const output = {
  //     id: '634852326b35b59438fbea2f',
  //     model: 'Honda Cb 600f Hornet',
  //     year: 2005,
  //     color: 'Yellow',
  //     status: true,
  //     buyValue: 30.000,
  //     category: 'Street',
  //     engineCapacity: 600,
  //   };
  //   sinon.stub(Model, 'findOne').resolves(output);

  //   const service = new MotorcycleService();
  //   const result = await service.findById(id);

  //   expect(result).to.be.deep.equal(output);
  // });
  afterEach(function () {
    sinon.restore();
  });
});