import React from 'react';
import List, { ListProps } from '@mui/material/List';

interface ListComponentProps extends ListProps {}

const ListComponent: React.FC<ListComponentProps> = (props) => {
  return <List {...props} />;
};

export default ListComponent;