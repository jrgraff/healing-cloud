export const patientSchema = {
  type: 'object',
  properties: {
    full_name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    birth_date: { type: 'string' },
    cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '\\d+' },
  },
  required: ['email', 'full_name', 'cpf', 'birth_date'],
};
