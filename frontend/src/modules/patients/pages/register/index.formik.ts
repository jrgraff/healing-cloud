import * as yup from 'yup';

export const registerPatientInitialValues = {
  full_name: '',
  email: '',
  birth_date: new Date(),
  cpf: '',
  address: {
    number: undefined,
    country: '',
    uf: '',
    city: '',
    street: '',
    district: '',
    neighborhood: '',
    complement: '',
    cep: undefined,
  },
};

export const registerPatientValidation = yup.object({
  full_name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  birth_date: yup.date().required('Campo obrigatório'),
  cpf: yup
    .string()
    .required('Campo obrigatório')
    .length(11, 'O CPF deve conter 11 números'),
});
