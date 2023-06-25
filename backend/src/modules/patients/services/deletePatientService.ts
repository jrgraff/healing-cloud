import { IResponse } from '../../../types/response';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class DeletePatientService {
  public async execute(id: string): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    await patientsRepository.delete(id);

    return { success: `patient ${id} deleted` };
  }
}
