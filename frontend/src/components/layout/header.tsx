import React from 'react';

import { AppBar } from '@mui/material';
import logo from '../../assets/logo.png';

export function Header() {
  return (
    <header>
      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
          height: '4rem',
          bgcolor: 'inherit',
        }}
      >
        <img style={{ marginLeft: '2rem' }} src={logo} />
        <label style={{ color: '#021221', fontSize: '1.75rem' }}>
          healingCloud.
        </label>
      </AppBar>
    </header>
  );
}
