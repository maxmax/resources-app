import React from 'react';
import DialogActions, { DialogActionsProps } from '@mui/material/DialogActions';

const DialogActionsComponent: React.FC<DialogActionsProps> = (props) => {
  return <DialogActions {...props} />;
};

export default DialogActionsComponent;