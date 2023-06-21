import * as yup from 'yup';

export const registerPatientInitialValues = {
  name: '',
  email: '',
  birth_date: new Date(),
  cpf: '',
};

export const registerPatientValidation = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  birth_date: yup.date().required('Campo obrigatório'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .length(11, 'O CPF deve conter 11 números'),
});
