import { IResponse } from '../../../types/response';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class GetPatientsService {
  public async execute(
    startKey: string,
    search: string,
    limit: number,
  ): Promise<IResponse> {
    const patientsRepository = new PatientsRepository();

    const patient = await patientsRepository.findAll(startKey, search, limit);

    return patient;
  }
}
