import React from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  edit?: (id: number) => void;
}

interface TableColumn<T> {
  key: string;
  label: string;
  render: (data: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainTable: React.FC<TableProps<any>> = ({ data, columns, edit }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
            <TableCell align="right">-/-</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>{column.render(row)}</TableCell>
              ))}
              <TableCell align="right">
                {edit && (
                  <Button onClick={() => edit(row.id)}>
                    <EditIcon fontSize="small" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
