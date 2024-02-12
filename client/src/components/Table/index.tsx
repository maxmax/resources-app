import React from 'react';
import Table, { TableProps } from '@mui/material/Table';

const TableComponent: React.FC<TableProps> = (props) => {
  return <Table {...props} />;
};

export default TableComponent;