import { IResponse } from '../../../types/response';
import { IPatient } from '../dtos/patientDTO';
import { PatientsRepository } from '../repositories/patientsRepository';
import createHttpError from 'http-errors';

export default class CreatePatientService {
  public async execute(data: IPatient): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    const patientExists = await patientsRepository.findByEmail(data.email);

    if (patientExists) {
      throw new createHttpError.BadRequest(
        JSON.stringify({
          errorMessage: 'Email já cadastrado!',
        }),
      );
    }

    const patient = await patientsRepository.create(data);

    return patient;
  }
}
