import React, { FC } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  LinearLoading,
} from '@/components';
import { getResource } from '@/utils/api/resources';

interface TaskListProps {
  resourceId: number;
  close: (open: boolean) => void;
}

const TaskList: FC<TaskListProps> = ({ resourceId, close }) => {

  const { status, data, error } = getResource(Number(resourceId));

  return (
    <React.Fragment>
      {status === 'loading' && (<LinearLoading />)}
      {error instanceof Error && (<span>Error: {error.message}</span>)}
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
          {data?.tasks.map((row, index) => (
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
			<Grid container spacing={2} sx={{ mt: 3 }}>
				<Grid item xs={12}>
					<Button onClick={() => close(false)} variant="outlined">
						Close
					</Button>
				</Grid>
			</Grid>
    </React.Fragment>
  );
};

export default TaskList;
