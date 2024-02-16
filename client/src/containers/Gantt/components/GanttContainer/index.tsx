import * as React from 'react';
import { ResourceProps } from '@/utils/api/resources';
import { TimeRangeProps } from '@/utils/api/time-range';
import GanttLayout from '../GanttLayout';
import ResourcesBar from '../ResourcesBar';
import TimeTable from '../TimeTable';

interface GanttContainerProps {
  resources: ResourceProps[];
  timeRange: TimeRangeProps;
}

const GanttContainer: React.FC<GanttContainerProps> = ({ resources, timeRange }) => {

  return (
    <>
      <GanttLayout>
        <div className='gantt-space-container'>
          <ResourcesBar resources={resources} />
          <TimeTable 
            timeRange={timeRange}
            resources={resources}
            setPrevMonth={() => console.log('setPrevMonth')}
            setNextMonth={() => console.log('setPrevMonth')}
          />
        </div>
      </GanttLayout>
    </>
  );
}

export default GanttContainer;