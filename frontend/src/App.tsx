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
      <Container
        maxWidth={false}
        disableGutters
        sx={{ marginTop: '2rem', padding: '0 2.5rem' }}
      >
        {allowedRoutes}
      </Container>
    </>
  );
}

export default App;
