import React from 'react';
import TableRow, { TableRowProps } from '@mui/material/TableRow';

const TableRowComponent: React.FC<TableRowProps> = (props) => {
  return <TableRow {...props} />;
};

export default TableRowComponent;