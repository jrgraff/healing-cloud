import { useQuery } from 'react-query';

import api from '../../services/api';
import { useErrorHandler } from '../../context/errorHandler';

export const getAllPatients = (
  startKey: string | undefined,
  search: string
) => {
  const { handleError } = useErrorHandler();

  let query = '/patients?';
  if (startKey) query += '&startKey=' + startKey;
  if (search) query += '&search=' + search;

  return useQuery(
    ['patients', startKey, search],
    async () => {
      const { data } = await api.get(query);

      return data;
    },
    { onError: handleError }
  );
};

export const getPatientById = (id: string) => {
  const { handleError } = useErrorHandler();

  return useQuery(
    ['patients', id],
    async () => {
      const { data } = await api.get(`/patients/${id}`);

      return data;
    },
    { onError: handleError }
  );
};
