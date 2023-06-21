import React from 'react';

import { IRouteType } from '../../types/IRouteType';
import { ListPatients } from './pages/list';
import { RegisterPatient } from './pages/register';

export const PatientsRoutes: IRouteType = {
  path: '',
  children: [
    {
      path: '', // List all patients
      element: <ListPatients />,
    },
    {
      path: ':id/edit', // Update patients
      element: <RegisterPatient />,
    },
    {
      path: 'create', // Create patients
      element: <RegisterPatient />,
    },
  ],
};
