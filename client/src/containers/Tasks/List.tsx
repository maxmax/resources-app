import * as React from 'react';
import {
  PageLayout,
  PageHeader,
  BasicCard,
  LinearLoading,
  Grid,
} from '@/components';

import { getTasks } from '@/utils/api/tasks';

export default function Tasks() {

  const { status, data, error } = getTasks();

  return (
    <PageLayout>
      <PageHeader title='Tasks' />
      {status === 'loading' ? (
        <LinearLoading />
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Grid container spacing={2}>
            {data?.map((task) => (
              <Grid item xs={4} key={task.id}>
                <BasicCard
                  title={task.title}
                  content={task.content}
                  link={`/tasks/${task.id}`}
                  linkText={'Show more'}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </PageLayout>
  );
}
