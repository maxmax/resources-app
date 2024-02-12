import React from 'react';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';

const TableHeadComponent: React.FC<TableHeadProps> = (props) => {
  return <TableHead {...props} />;
};

export default TableHeadComponent;