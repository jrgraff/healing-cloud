import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Container } from '@mui/material';

import { routes } from './routes';
import { Header } from './components/layout/header';

function App() {
  const allowedRoutes = useRoutes(routes);

  return (
    <>
      <Header />
      <Container fixed sx={{ marginTop: '4rem' }}>
        {allowedRoutes}
      </Container>
    </>
  );
}

export default App;
