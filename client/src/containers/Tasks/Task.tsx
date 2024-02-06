import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container,
  Box, 
  BasicCard, 
  LinearLoading 
} from "@/components";

import { getTask } from '@/utils/api/tasks';

export default function Task() {

  const { id } = useParams();
  const { status, data, error } = getTask(Number(id));

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
              content={data.content}
              link={'/tasks'}
              linkText={'Back'}
            />
          </>
        ) : null}
      </Box>
    </Container>
  );
}
