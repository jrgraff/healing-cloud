import { IPatient } from '../dtos/patientDTO';
import { PatientsRepository } from '../repositories/patientsRepository';

export default class CreatePatientService {
  public async execute(data: IPatient): Promise<IPatient> {
    const patientsRepository = new PatientsRepository();

    const patientExists = await patientsRepository.findByEmail(data.email);

    if (patientExists) {
      throw new Error('Email informado já está cadastrado');
    }

    const patient = await patientsRepository.create(data);

    return patient;
  }
}
