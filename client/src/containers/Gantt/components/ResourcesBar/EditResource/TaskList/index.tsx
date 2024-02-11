import React, { FC } from 'react';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TaskProps } from '@/utils/api/tasks';

interface TaskListProps {
  tasks: TaskProps[];
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {

  return (
    <React.Fragment>
      <Table size="small" sx={{ border: 1, borderColor: 'grey.300', mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderRight: 1, borderColor: 'grey.300' }}>#</TableCell>
            <TableCell sx={{ borderRight: 1, borderColor: 'grey.300', textTransform: 'capitalize' }}>Title</TableCell>
            <TableCell sx={{ borderRight: 1, borderColor: 'grey.300', textTransform: 'capitalize' }}>Start</TableCell>
            <TableCell sx={{ borderRight: 1, borderColor: 'grey.300', textTransform: 'capitalize' }}>End</TableCell>
            <TableCell sx={{ borderRight: 1, borderColor: 'grey.300', textTransform: 'capitalize' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((row, index) => (
            <TableRow
              key={row.id}
            >
              <TableCell sx={{ width: 5, borderRight: 1, borderColor: 'grey.300' }}>{index + 1}</TableCell>
              <TableCell sx={{ borderRight: 1, borderColor: 'grey.300' }}>{row.title}</TableCell>
              <TableCell sx={{ borderRight: 1, borderColor: 'grey.300' }}>{dayjs(row.start).format('DD/MM/YYYY')}</TableCell>
              <TableCell sx={{ borderRight: 1, borderColor: 'grey.300' }}>{dayjs(row.end).format('DD/MM/YYYY')}</TableCell>
              <TableCell sx={{ borderRight: 1, borderColor: 'grey.300' }}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default TaskList;
