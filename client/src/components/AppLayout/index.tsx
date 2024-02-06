import * as React from 'react';
import Container from "@/components/Container";
import BasicBar from '@/components/BasicBar';

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
