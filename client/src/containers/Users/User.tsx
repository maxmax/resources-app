import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BasicCard } from "../../components";

import { getUser } from './api';

export default function User() {

  const { id } = useParams();
  const { status, data, error } = getUser(Number(id));

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {status === 'loading' ? (
          <LinearProgress />
        ) : error instanceof Error ? (
          <span>Error: {error.message}</span>
        ) : data ? (
          <>
            <BasicCard
              title={data.name}
              content={data.email}
              link={'/users'}
              linkText={'Back'}
            />
          </>
        ) : null}
      </Box>
    </Container>
  );
}
