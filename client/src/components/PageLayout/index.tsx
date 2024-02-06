import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          {children}
        </Box>
      </Container>
    </>
  );
}

export default PageLayout;
