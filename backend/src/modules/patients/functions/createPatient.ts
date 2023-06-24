import { APIGatewayProxyHandler } from 'aws-lambda';

import CreatePatientService from '../services/createPatientService';
import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';
import { IPatient } from '../dtos/patientDTO';

const createPatient: APIGatewayProxyHandler = async (event) => {
  const data = event.body as unknown as IPatient;

  const createPatientService = new CreatePatientService();

  const response = await createPatientService.execute(data);

  return formatJSONResponse(response, 201);
};

export const handler = middyfy(createPatient);
