import * as React from 'react';
import Container from '@mui/material/Container';
import BasicBar from '../BasicBar';

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <BasicBar />
      <Container maxWidth="xl">
        {children}
      </Container>
    </>
  );
}

export default AppLayout;
