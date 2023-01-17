import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import { 
  motoBody,
  findAllOutput,
  findByIdOutput,
  motoMessage,
  idMessage } from '../../Mocks/motocycleMocks';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Test suit for motorcycles', function () {
  it('Should register a motorcycle on correct request', async function () {
    const registerOutput: Motorcycle = new Motorcycle(motoBody);
    sinon.stub(Model, 'create').resolves(registerOutput);

    const service = new MotorcycleService();
    const result = await service.register(motoBody);

    expect(result).to.be.deep.equal(registerOutput);
  });
  it('Should list all motorcycles', async function () {
    sinon.stub(Model, 'find').resolves(findAllOutput);

    const service = new MotorcycleService();
    const result = await service.findAll();

    expect(result).to.be.deep.equal(findAllOutput);
  });
  it('Should list one motorcycle by id', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findOne').resolves(findByIdOutput);

    const service = new MotorcycleService();
    const result = await service.findById(id);

    expect(result).to.be.deep.equal(findByIdOutput);
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

    sinon.stub(Model, 'findByIdAndUpdate').resolves(findByIdOutput);

    const service = new MotorcycleService();
    const response = await service.updateById(id, motoBody);
    expect(response).to.be.deep.equal(findByIdOutput);
  });

  it('Should return 422 on update with invalid id', async function () {
    const id = '63c58cf07f367d63d';

    sinon.stub(Model, 'findOneAndUpdate').resolves({});

    try {
      const service = new MotorcycleService();
      await service.updateById(id, motoBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(idMessage);
    }
  });
  it('Should return 404 on update with inexisting id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findOneAndUpdate').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.updateById(id, motoBody);
    } catch (e) {
      expect((e as Error).message).to.be.equal(motoMessage);
    }
  });

  it('Should delete existing motorcycle by id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findByIdAndDelete').resolves(findByIdOutput);

    const service = new MotorcycleService();
    const response = await service.delete(id);
    
    expect(response).to.be.deep.equal(findByIdOutput);
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