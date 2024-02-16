import * as React from 'react';
import { PageLayout, PageHeader, LinearLoading } from '@/components';
import GanttContainer from './components/GanttContainer';
import { getResources } from '@/utils/api/resources';
import { getTimeRange } from '@/utils/api/time-range';

export default function Gantt() {

  const { status, data, error } = getResources();

  const { data: timeRangeData } = getTimeRange();

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
