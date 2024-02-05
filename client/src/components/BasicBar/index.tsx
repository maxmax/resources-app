import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface Page {
  id: number;
  name: string;
  url: string;
}

interface BasicBarProps {}

const pages: Page[] = [
  {
    id: 1,
    name: 'Home',
    url: '/',
  },
  {
    id: 2,
    name: 'Resources',
    url: '/resources',
  },
  {
    id: 3,
    name: 'Users',
    url: '/users',
  },
];

const BasicBar: React.FC<BasicBarProps> = () => {
  const navigate = useNavigate();

  function handleNavigate(url: string) {
    navigate(url);
  }

  function handleUserLogin() {
    console.log('handleUserLogin!');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ResourcesApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handleNavigate(page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Button color="inherit" onClick={() => handleUserLogin()}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BasicBar;
