import React from 'react';
import Container, { ContainerProps } from '@mui/material/Container';

interface ContainerComponentProps extends ContainerProps {}

const ContainerComponent: React.FC<ContainerComponentProps> = (props) => {
  return <Container {...props} />;
};

export default ContainerComponent;
