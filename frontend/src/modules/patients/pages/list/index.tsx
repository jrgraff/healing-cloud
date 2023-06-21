import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import api from '../../../../services/api';
import { Search } from '../../../../components/search';
import { CustomPaginationTable } from '../../components/customTable';
import { IPatient } from '../../types';
import { Error } from '../../../../components/error';
import { ConfirmDialog } from '../../../../components/dialog/confirmDialog';

interface IPatientsList {
  count: number;
  patients: IPatient[];
}

export function ListPatients() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [patientsData, setPatientsData] = useState<IPatientsList>();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [patientId, setPatientId] = useState<string>();

  useEffect(() => {
    handleFetchPatients();
  }, [page]);

  const handleFetchPatients = async () => {
    const response = await api.get(`/patients?_page=${page + 1}`);

    setPatientsData({ patients: response.data, count: 2 });
  };

  const handleDeletePatient = async () => {
    if (!patientId) return;

    await api.delete(`/patients/${patientId}`);
    handleFetchPatients();
  };

  return (
    <>
      <ConfirmDialog
        visible={confirmDelete}
        setVisible={setConfirmDelete}
        onConfirm={handleDeletePatient}
      />
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Typography component="h1" variant="h4">
            Pacientes
          </Typography>
          <Stack direction="row" spacing={3}>
            <Search />
            <Button
              onClick={() => navigate(`create`)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Novo
            </Button>
          </Stack>
        </Stack>
      </Box>
      <CustomPaginationTable
        page={page}
        setPage={setPage}
        values={patientsData?.patients || []}
        valuesCount={patientsData?.count || 0}
        handleEditRow={id => navigate(`${id}/edit`)}
        handleDeleteRow={id => {
          setConfirmDelete(true);
          setPatientId(id);
        }}
      />
    </>
  );
}
