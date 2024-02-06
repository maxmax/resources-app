import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

interface LinearLoadingProps extends LinearProgressProps {}

const LinearLoading: React.FC<LinearLoadingProps> = (props) => {
  return <LinearProgress {...props} />;
};

export default LinearLoading;