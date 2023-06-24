import { APIGatewayProxyHandler } from 'aws-lambda';

import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';
import GetPatientsService from '../services/getPatientsService';

const getPatients: APIGatewayProxyHandler = async (event) => {
  const params = event.queryStringParameters;

  const getPatientsService = new GetPatientsService();

  const patients = await getPatientsService.execute(
    Number(params?.page || 0),
    String(params?.search || ''),
  );

  return formatJSONResponse(patients, 200);
};

export const handler = middyfy(getPatients);
