import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.png';

export function Header() {
  return (
    <header>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: t => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <img style={{ margin: '0 1rem' }} src={logo} />
          <Typography variant="h6" color="inherit" noWrap>
            healingCloud.
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
