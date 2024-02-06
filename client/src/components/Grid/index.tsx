import React from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

interface GridComponentProps extends GridProps {}

const GridComponent: React.FC<GridComponentProps> = (props) => {
  return <Grid {...props} />;
};

export default GridComponent;