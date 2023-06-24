import { IResponse } from '../../../types/response';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class GetPatientByIdService {
  public async execute(id: string): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    const patient = await patientsRepository.findById(id);

    return patient;
  }
}
