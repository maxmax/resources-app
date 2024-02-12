import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';

const DialogComponent: React.FC<DialogProps> = (props) => {
  return <Dialog {...props} />;
};

export default DialogComponent;