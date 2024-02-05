import * as React from 'react';
import dayjs from 'dayjs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import { useResources } from './api';

export default function Resources() {

  const { status, data, error } = useResources();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resources
        </Typography>
        {status === 'loading' ? (
          <LinearProgress />
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>createdAt</TableCell>
                    <TableCell>title</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell align="right">-/-</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((resource) => (
                    <TableRow
                      key={resource.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {resource.id}
                      </TableCell>
                      <TableCell>{dayjs(resource.createdAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{resource.title}</TableCell>
                      <TableCell>{resource.status}</TableCell>
                      <TableCell align="right">
                        <EditIcon fontSize="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
}
