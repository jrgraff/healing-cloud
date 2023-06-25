import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Error } from '../../../../components/error';
import {
  registerPatientInitialValues,
  registerPatientValidation,
} from './index.formik';
import { getPatientById, savePatient } from '../../hooks';

export function RegisterPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = getPatientById(id);
  const { mutate } = savePatient(() => navigate('/'));

  if (isLoading) return <CircularProgress />;
  if (id && !data) return <Error error={204} />;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography component="h1" variant="h4">
            {id ? 'Editar ' : 'Criar'} paciente
          </Typography>
        </Stack>
        <Formik
          initialValues={id ? data : registerPatientInitialValues}
          validationSchema={registerPatientValidation}
          enableReinitialize={true}
          onSubmit={(data, helper) => {
            mutate(data);
            helper.setSubmitting(false);
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form autoComplete="off">
              <Grid spacing={2} container boxShadow={1} paddingY={2}>
                <Grid item xs={3}>
                  <Field
                    fullWidth
                    name="full_name"
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
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      id="date-picker-dialog"
                      label="Data de nascimento"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      value={values?.birth_date || ''}
                      onChange={value => setFieldValue('birth_date', value)}
                    />
                  </MuiPickersUtilsProvider>
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
                  onClick={() => navigate('/')}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
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
