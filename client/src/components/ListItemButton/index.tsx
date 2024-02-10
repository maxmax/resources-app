import React from 'react';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';

interface ListItemButtonComponentProps extends ListItemButtonProps {}

const ListItemButtonComponent: React.FC<ListItemButtonComponentProps> = (props) => {
  return <ListItemButton {...props} />;
};

export default ListItemButtonComponent;