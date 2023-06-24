import { randomUUID } from 'crypto';
import { document } from '../../../lib/dynamodbClient';
import { IPatient } from '../dtos/patientDTO';

interface IPatientsRepository {
  create(data: IPatient): Promise<IPatient>;
  update(data: IPatient): Promise<IPatient>;
  findById(id: string): Promise<IPatient | undefined>;
  findByEmail(email: string): Promise<IPatient | undefined>;
  findAll(page: number, search: string): Promise<[IPatient[], number]>;
}

export class PatientsRepository implements IPatientsRepository {
  async create(data: IPatient): Promise<IPatient> {
    await document
      .put({
        TableName: 'hc-patients',
        Item: {
          ...data,
          id: randomUUID(),
          created_at: new Date().toUTCString(),
        },
      })
      .promise();

    const item = await this.findByEmail(data.email);

    return item;
  }
  async update(data: IPatient): Promise<IPatient> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<IPatient> {
    const params = {
      TableName: 'hc-patients',
      Key: { id },
    };

    const response = await document.get(params).promise();

    return response.Item;
  }
  async findByEmail(email: string): Promise<IPatient | undefined> {
    const params = {
      TableName: 'hc-patients',
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };

    const response = await document.scan(params).promise();

    return response?.Items?.length > 0 ? response.Items[0] : undefined;
  }
  async findAll(page: number, search: string): Promise<IPatient[]> {
    const params = {
      TableName: 'hc-patients',
      FilterExpression: 'contains(name, :search)',
      ExpressionAttributeValues: { ':search': search },
    };

    const response = await document.scan(params).promise();

    return response.Items;
  }
}
