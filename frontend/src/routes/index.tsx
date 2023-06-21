import React from 'react';
import { Error } from '../components/error';
import { IBaseRoute } from '../types/IRouteType';
import { PatientsRoutes } from '../modules/patients';

export const routes: IBaseRoute[] = [
  {
    path: '',
    children: [PatientsRoutes],
  },
  {
    path: '*',
    children: [],
    element: <Error error={404} />,
  },
];
