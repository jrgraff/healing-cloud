import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

interface SearchProps {
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
}

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    border: 'solid 1px',
    borderRadius: '5px',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export function Search({ setSearch, setPage }: SearchProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(0);
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <SearchBar onChange={e => setSearchInput(e.target.value)}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Buscar" />
      </SearchBar>
      <Button onClick={handleSearch} variant="contained" color="secondary">
        Buscar
      </Button>
    </Stack>
  );
}
