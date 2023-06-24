import { APIGatewayProxyHandler } from 'aws-lambda';

import GetPatientById from '../services/getPatientByIdService';
import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';

const getPatientById: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const getPatientById = new GetPatientById();

  const response = await getPatientById.execute(id);

  return formatJSONResponse(response);
};

export const handler = middyfy(getPatientById);
