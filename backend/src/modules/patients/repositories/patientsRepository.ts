import { randomUUID } from 'crypto';
import { document } from '../../../lib/dynamodbClient';
import { IPatient } from '../dtos/patientDTO';

interface IPatientsRepository {
  create(data: IPatient): Promise<IPatient>;
  update(id: string, data: IPatient): Promise<IPatient>;
  findById(id: string): Promise<IPatient | undefined>;
  findByEmail(email: string): Promise<IPatient | undefined>;
  findAll(
    startKey: string,
    search: string,
    limit?: number,
  ): Promise<{ count: number; patients: IPatient[] }>;
}

export class PatientsRepository implements IPatientsRepository {
  tableName = 'hc-patients';

  async create(data: IPatient): Promise<IPatient> {
    await document
      .put({
        TableName: this.tableName,
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
      .map((__, index) => `#field${index} = :value${index}`)
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
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: dataNames,
      ExpressionAttributeValues: dataValues,
    };

    await document.update(params).promise();

    const response = await this.findById(id);

    return response as IPatient;
  }
  async findById(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    const response = await document.get(params).promise();

    return response.Item as IPatient;
  }

  async delete(id: string) {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };

    await document.delete(params).promise();
  }

  async findByEmail(email: string): Promise<IPatient | undefined> {
    const params = {
      TableName: this.tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };

    const response = await document.scan(params).promise();

    return response?.Items?.length > 0
      ? (response.Items[0] as IPatient)
      : undefined;
  }

  async findAll(startKey: string, search: string, limit: number) {
    const exclusiveStartKey = startKey
      ? {
          id: startKey,
        }
      : undefined;

    const params = {
      TableName: this.tableName,
      FilterExpression:
        'contains(full_name, :search) or contains(email, :search)',
      ExpressionAttributeValues: { ':search': search },
      Limit: limit,
      ExclusiveStartKey: exclusiveStartKey,
    };

    const response = await document.scan(params).promise();

    const count = await this.countPatients(search);

    return { count, patients: response.Items } as {
      count: number;
      patients: IPatient[];
    };
  }

  async countPatients(filter: string): Promise<number> {
    const params = {
      TableName: this.tableName,
      Select: 'COUNT',
      FilterExpression:
        'contains(full_name, :search) or contains(email, :search)',
      ExpressionAttributeValues: { ':search': filter },
    };

    const count = await document.scan(params).promise();

    return count.Count;
  }
}
