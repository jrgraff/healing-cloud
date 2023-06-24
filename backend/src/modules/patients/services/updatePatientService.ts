import createHttpError from 'http-errors';

import { IResponse } from '../../../types/response';
import { IPatient } from '../dtos/patientDTO';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class UpdatePatientService {
  public async execute(id: string, data: IPatient): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    const patientExists = await patientsRepository.findById(id);

    if (!patientExists) {
      throw new createHttpError.BadRequest(
        JSON.stringify({
          errorMessage: 'Paciente não encontrado!',
        }),
      );
    }

    const patient = await patientsRepository.update(id, data);

    return patient;
  }
}
