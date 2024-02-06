import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface BoxComponentProps extends BoxProps {}

const BoxComponent: React.FC<BoxComponentProps> = (props) => {
  return <Box {...props} />;
};

export default BoxComponent;