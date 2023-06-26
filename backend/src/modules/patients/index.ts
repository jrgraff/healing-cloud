import { handlerPath } from '../../lib/handler-resolver';
import { patientSchema } from './schemas/patientSchema';

const dir = handlerPath(__dirname);

const createPatient = {
  handler: `${dir}/functions/createPatient.handler`,
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
        cors: true,
      },
    },
  ],
};

const updatePatient = {
  handler: `${dir}/functions/updatePatient.handler`,
  events: [
    {
      http: {
        method: 'put',
        path: 'patients/{id}',
        request: {
          schemas: {
            'application/json': patientSchema,
          },
        },
        cors: true,
      },
    },
  ],
};

const getPatientById = {
  handler: `${dir}/functions/getPatientById.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'patients/{id}',
        cors: true,
      },
    },
  ],
};

const deletePatient = {
  handler: `${dir}/functions/deletePatient.handler`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'patients/{id}',
        cors: true,
      },
    },
  ],
};

const getPatients = {
  handler: `${dir}/functions/getPatients.handler`,
  events: [
    {
      http: {
        method: 'get',
        path: 'patients',
        cors: true,
      },
    },
  ],
};

export const patients = {
  createPatient,
  updatePatient,
  getPatientById,
  getPatients,
  deletePatient,
};
