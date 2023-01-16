import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const model = 'Honda Cb 600f Hornet';
const motoMessage = 'Motorcycle not found';
const idMessage = 'Invalid mongo id';

describe('Test suit for motorcycles', function () {
  it('Should register a motorcycle on correct request', async function () {
    const motoBody: IMotorcycle = {
      model,
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
  it('Should list all motorcycles', async function () {
    const output = [
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
    sinon.stub(Model, 'find').resolves(output);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(output);
  });
  it('Should list one motorcycle by id', async function () {
    const id = '634852326b35b59438fbea2f';
    const output = {
      id: '634852326b35b59438fbea2f',
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    sinon.stub(Model, 'findOne').resolves(output);

    const service = new MotorcycleService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal(output);
  });

  it('Should return 422 on get with invalid id', async function () {
    const id = '63c58cf07f3b663d';

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });
  it('Should return 404 on get with inexisting id', async function () {
    const id = '63c58cf07f367d16a9b663ad';

    sinon.stub(Model, 'findOne').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(motoMessage);
    }
  });

  it('Should update existing motorcycle by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const reqBody:IMotorcycle = {
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const resolveUpdate = {
      id: '63c58cf07f367d16a9b6463d',
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(resolveUpdate);

    const service = new MotorcycleService();
    const response = await service.updateById(id, reqBody);
    expect(response).to.be.deep.equal(resolveUpdate);
  });

  it('Should return 422 on update with invalid id', async function () {
    const id = '63c58cf07f367d63d';
    const reqBody:IMotorcycle = {
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOneAndUpdate').resolves({});

    try {
      const service = new MotorcycleService();
      await service.updateById(id, reqBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });
  it('Should return 404 on update with inexisting id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const reqBody:IMotorcycle = {
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOneAndUpdate').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.updateById(id, reqBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(motoMessage);
    }
  });

  it('Should delete existing motorcycle by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    const resolveUpdate: IMotorcycle = {
      id: '63c58cf07f367d16a9b6463d',
      model,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findByIdAndDelete').resolves(resolveUpdate);

    const service = new MotorcycleService();
    const response = await service.delete(id);
    
    expect(response).to.be.deep.equal(resolveUpdate);
  });

  it('Should return 422 on delete with invalid id', async function () {
    const id = '63c58cf07f3b663d';

    sinon.stub(Model, 'findOneAndDelete').resolves({});

    try {
      const service = new MotorcycleService();
      await service.delete(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });

  it('Should not delete non-existing id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findByIdAndDelete').resolves(null);

    try {
      const service = new MotorcycleService();
      await service.delete(id);  
    } catch (e) {
      expect((e as Error).message).to.be.deep.equal('Motorcycle not found');
    }
  });
  afterEach(function () {
    sinon.restore();
  });
});