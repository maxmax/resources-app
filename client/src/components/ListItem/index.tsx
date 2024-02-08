import React from 'react';
import ListItem, { ListItemProps } from '@mui/material/ListItem';

interface ListItemComponentProps extends ListItemProps {}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {
  return <ListItem {...props} />;
};

export default ListItemComponent;