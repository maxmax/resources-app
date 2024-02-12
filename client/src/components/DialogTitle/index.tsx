import React from 'react';
import DialogTitle, { DialogTitleProps } from '@mui/material/DialogTitle';

const DialogTitleComponent: React.FC<DialogTitleProps> = (props) => {
  return <DialogTitle {...props} />;
};

export default DialogTitleComponent;