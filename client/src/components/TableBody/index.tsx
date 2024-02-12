import React from 'react';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';

const TableBodyComponent: React.FC<TableBodyProps> = (props) => {
  return <TableBody {...props} />;
};

export default TableBodyComponent;