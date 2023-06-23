import { APIGatewayProxyHandler } from 'aws-lambda';
import CreatePatientService from '../services/createPatientService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const data = JSON.parse(event.body);

  const createPatientService = new CreatePatientService();

  const patient = await createPatientService.execute(data);

  return {
    statusCode: 200,
    body: JSON.stringify(patient),
  };
};
