import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container,
  Box,
  BasicCard, 
  LinearLoading 
} from "@/components";

import { getUser } from '@/utils/api/users';

export default function User() {

  const { id } = useParams();
  const { status, data, error } = getUser(Number(id));

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
