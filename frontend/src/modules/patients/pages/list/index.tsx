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
import { ConfirmDialog } from '../../../../components/dialog/confirmDialog';
import { getAllPatients } from '../../hooks';

export function ListPatients() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [startKeys, setStartKeys] = useState<string[]>([]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [patientId, setPatientId] = useState<string>();

  const { data } = getAllPatients(startKeys[page], search);

  useEffect(() => {
    const keys = [...startKeys];
    keys[page + 1] = data?.patients[data?.patients.length - 1]?.id;

    setStartKeys(keys);
  }, [data]);

  const handleDeletePatient = async () => {
    if (!patientId) return;

    await api.delete(`/patients/${patientId}`);
    setPage(0);
    setStartKeys([]);
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
            <Search setSearch={setSearch} setPage={setPage} />
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
        values={data?.patients || []}
        valuesCount={data?.count || 0}
        handleEditRow={id => navigate(`${id}/edit`)}
        handleDeleteRow={id => {
          setConfirmDelete(true);
          setPatientId(id);
        }}
      />
    </>
  );
}
