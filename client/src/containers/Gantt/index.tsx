import * as React from 'react';
import { PageLayout, PageHeader, LinearLoading } from '@/components';
import GanttContainer from './components/GanttContainer';

import { getResources } from '@/utils/api/resources';

export default function Gantt() {

  const { status, data, error } = getResources();

  console.log('Gantt data', data);

  return (
    <PageLayout>
      <PageHeader title='Gantt Chart' />
      {status === 'loading' ? (
        <LinearLoading />
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data && <GanttContainer resources={data} />}
        </>
      )}
    </PageLayout>
  );
}
