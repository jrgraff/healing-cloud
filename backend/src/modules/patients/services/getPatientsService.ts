import { IResponse } from '../../../types/response';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class GetPatientsService {
  public async execute(page: number, search: string): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    const patient = await patientsRepository.findAll(page, search);

    return patient;
  }
}
