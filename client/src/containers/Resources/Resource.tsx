import * as React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { BasicCard } from "../../components";

import { getResource } from './api';

export default function Resource() {

  const { id } = useParams();
  const { status, data, error } = getResource(Number(id));

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
              title={data.title}
              content={data.status}
              link={'/resources'}
              linkText={'Back'}
            />
          </>
        ) : null}
      </Box>
    </Container>
  );
}
