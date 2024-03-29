import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container,
  Box,
  BasicCard, 
  LinearLoading 
} from "@/components";

import { getResource } from '@/utils/api/resources';

export default function Resource() {

  const { id } = useParams();
  const { status, data, error } = getResource(Number(id));

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {status === 'loading' ? (
          <LinearLoading />
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
