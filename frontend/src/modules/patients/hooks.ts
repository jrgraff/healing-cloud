import { useMutation, useQuery } from 'react-query';

import api from '../../services/api';
import { useErrorHandler } from '../../context/errorHandler';
import { IPatient } from './types';

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

export const getPatientById = (id: string | undefined) => {
  if (!id) return { data: undefined, isLoading: false };

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

export const savePatient = (onSuccess: () => void) => {
  const registerPatient = async ({
    id,
    ...data
  }: {
    id: string;
    data: IPatient;
  }) => {
    if (id) {
      await api.put(`/patients/${id}`, data);
    } else {
      await api.post(`/patients/`, data);
    }
  };
  const { handleError } = useErrorHandler();

  return useMutation(registerPatient, { onSuccess, onError: handleError });
};
