import { handlerPath } from '../../lib/handler-resolver';
import { patientSchema } from './schemas/patientSchema';

export const createPatient = {
  handler: `${handlerPath(__dirname)}/functions/createPatient.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'patients',
        request: {
          schemas: {
            'application/json': patientSchema,
          },
        },
      },
    },
  ],
};
