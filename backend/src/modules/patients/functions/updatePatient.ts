import { APIGatewayProxyHandler } from 'aws-lambda';

import UpdatePatientService from '../services/updatePatientService';
import { middyfy } from '../../../lib/lambda';
import { formatJSONResponse } from '../../../lib/api-gateway';
import { IPatient } from '../dtos/patientDTO';

const updatePatient: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  const data = event.body as unknown as IPatient;

  const updatePatientService = new UpdatePatientService();

  const patient = await updatePatientService.execute(id, data);

  return formatJSONResponse(patient, 201);
};

export const handler = middyfy(updatePatient);
