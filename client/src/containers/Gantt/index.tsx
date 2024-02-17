import * as React from 'react';
import { PageLayout, PageHeader, LinearLoading } from '@/components';
import GanttContainer from './components/GanttContainer';
import { getTimeRange } from '@/utils/api/time-range';
import { getResources } from '@/utils/api/resources';

export default function Gantt() {
  const { data: timeRangeData } = getTimeRange();
  const { data, status, error } = getResources();

  return (
    <PageLayout>
      <PageHeader title='Gantt Chart' />
      {status === 'loading' ? (
        <LinearLoading />
      ) : error instanceof Error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data && timeRangeData && <GanttContainer resources={data} timeRange={timeRangeData} />}
        </>
      )}
    </PageLayout>
  );
}
