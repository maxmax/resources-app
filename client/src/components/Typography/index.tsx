import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface TypographyComponentProps extends TypographyProps {}

const TypographyComponent: React.FC<TypographyComponentProps> = (props) => {
  return <Typography {...props} />;
};

export default TypographyComponent;