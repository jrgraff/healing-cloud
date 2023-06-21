import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { DatePicker } from 'formik-mui-lab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import api from '../../../../services/api';
import { IPatient } from '../../types';
import { Error } from '../../../../components/error';
import {
  registerPatientInitialValues,
  registerPatientValidation,
} from './index.formik';

export function RegisterPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState<IPatient>();

  useEffect(() => {
    if (id) {
      (async () => {
        const response = await api.get(`/patients/${id}`);

        setPatient(response.data);
      })();
    }
  }, [id]);

  if (id && !patient) return <Error error={204} />;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography component="h1" variant="h4">
            {id ? 'Editar ' : 'Criar'} paciente
          </Typography>
        </Stack>
        <Formik
          initialValues={registerPatientInitialValues}
          validationSchema={registerPatientValidation}
          onSubmit={async values => {
            console.log('my values: ', values);
            return new Promise(res => setTimeout(res, 2500));
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete="off">
              <Grid spacing={2} container boxShadow={1} paddingY={2}>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="name"
                    component={TextField}
                    label="Nome completo"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="email"
                    component={TextField}
                    label="Email"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="birth_date"
                    component={TextField}
                    label="Data de nascimento"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="cpf"
                    component={TextField}
                    label="CPF"
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} container boxShadow={1} paddingY={2}>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.cep"
                    type="number"
                    component={TextField}
                    label="CEP"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.street"
                    component={TextField}
                    label="Endereço"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.number"
                    type="number"
                    component={TextField}
                    label="Número"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.complement"
                    component={TextField}
                    label="Complemento"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.district"
                    component={TextField}
                    label="Bairro"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.city"
                    component={TextField}
                    label="Cidade"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.uf"
                    component={TextField}
                    label="UF"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="address.country"
                    component={TextField}
                    label="País"
                  />
                </Grid>
              </Grid>

              <Box
                component="div"
                marginTop={2}
                sx={{ display: 'flex', gap: 1 }}
                justifyContent="end"
              >
                <Button
                  type="button"
                  variant="contained"
                  color="inherit"
                  disabled={isSubmitting}
                  onClick={() => navigate('/')}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size="0.8rem" />
                    ) : undefined
                  }
                >
                  {isSubmitting ? 'Salvando' : 'Salvar'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
