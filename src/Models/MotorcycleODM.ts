import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'motorcycle');
  }

  public async findAll(): Promise<IMotorcycle[] | []> {
    return this.model.find();
  }

  public async findById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById({ _id: id });
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    return this.model.findByIdAndDelete({ _id: id });
  }
}

export default MotorcycleODM;
