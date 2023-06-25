import { APIGatewayProxyHandler } from 'aws-lambda';

import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';
import GetPatientsService from '../services/getPatientsService';

const getPatients: APIGatewayProxyHandler = async (event) => {
  const params = event.queryStringParameters;

  const getPatientsService = new GetPatientsService();

  const patients = await getPatientsService.execute(
    params?.startKey,
    params?.search || '',
    Number(params?.limit) || 10,
  );

  return formatJSONResponse(patients, 200);
};

export const handler = middyfy(getPatients);
