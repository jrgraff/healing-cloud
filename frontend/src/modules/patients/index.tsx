import React, { FC } from 'react';

import { IRouteType } from '../../types/IRouteType';
import { ListPatients } from './pages/list';
// import { RegisterPatients } from './pages/Register';
// import { DetailPatients } from './pages/Detail';

export const PatientsRoutes: IRouteType = {
  path: '',
  children: [
    {
      path: '', // List all patients
      element: <ListPatients />,
    },
    // {
    //   path: ':id/create', // Update patients
    //   element: renderElement(RegisterPatients),
    // },
    // {
    //   path: 'create', // Create patients
    //   element: renderElement(RegisterPatients),
    // },
    // {
    //   path: ':id', // Detail patients
    //   element: renderElement(DetailPatients),
    // },
  ],
};
