import { randomUUID } from 'crypto';
import { document } from '../../../lib/dynamodbClient';
import { IPatient } from '../dtos/patientDTO';

interface IPatientsRepository {
  create(data: IPatient): Promise<IPatient>;
  update(id: string, data: IPatient): Promise<IPatient>;
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
  async update(id: string, data: IPatient): Promise<IPatient> {
    const items = { ...data, updated_at: new Date().toUTCString() };
    const itemKeys = Object.keys(items);

    let updateExpression = `SET ${itemKeys
      .map((k, index) => `#field${index} = :value${index}`)
      .join(', ')}`;
    let dataNames = itemKeys.reduce(
      (accumulator, k, index) => ({ ...accumulator, [`#field${index}`]: k }),
      {},
    );
    let dataValues = itemKeys.reduce(
      (accumulator, k, index) => ({
        ...accumulator,
        [`:value${index}`]: items[k],
      }),
      {},
    );

    const params = {
      TableName: 'hc-patients',
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: dataNames,
      ExpressionAttributeValues: dataValues,
    };

    await document.update(params).promise();

    const response = await this.findById(id);

    return response;
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
  async findAll(page: number, search: string): Promise<any> {
    const params = {
      TableName: 'hc-patients',
      FilterExpression:
        'contains(full_name, :search) or contains(email, :search)',
      ExpressionAttributeValues: { ':search': search },
    };

    const response = await document.scan(params).promise();

    return response.Items;
  }
}
