import { useQuery } from 'react-query';

import api from '../../services/api';

export const getAllPatients = (
  startKey: string | undefined,
  search: string
) => {
  let query = '/patients?';
  if (startKey) query += '&startKey=' + startKey;
  if (search) query += '&search=' + search;

  return useQuery(['patients', startKey, search], async () => {
    const { data } = await api.get(query);

    return data;
  });
};
