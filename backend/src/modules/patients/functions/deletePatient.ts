import { APIGatewayProxyHandler } from 'aws-lambda';

import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';
import DeletePatientService from '../services/deletePatientService';

const deletePatient: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const deletePatient = new DeletePatientService();

  const response = await deletePatient.execute(id);

  return formatJSONResponse(response);
};

export const handler = middyfy(deletePatient);
