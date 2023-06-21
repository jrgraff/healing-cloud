import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ptBR } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#149fda',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  },
  ptBR
);

export default theme;
