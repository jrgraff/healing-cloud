import React, { useEffect } from 'react';
import api from '../../../../services/api';

export function ListPatients() {
  useEffect(() => {
    (async () => {
      const response = await api.get('/patients');

      console.log(response.data);
    })();
  }, []);

  return <h1>Pacientes</h1>;
}
