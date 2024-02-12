import React from 'react';
import TableCell, { TableCellProps } from '@mui/material/TableCell';

const TableCellComponent: React.FC<TableCellProps> = (props) => {
  return <TableCell {...props} />;
};

export default TableCellComponent;