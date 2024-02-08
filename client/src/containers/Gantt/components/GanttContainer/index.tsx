import * as React from 'react';
import { ResourceProps } from '@/utils/api/resources';
import GanttLayout from '../GanttLayout';
import GanttBar from '../GanttBar';
import ResourcesBar from '../ResourcesBar';
import TimeTable from '../TimeTable';

// TODO: to user settings
const today = new Date();
const timeRange = {
  fromSelectDay: 1,
  fromSelectMonth: today.getMonth(),
  fromSelectYear: today.getFullYear(),
  toSelectDay: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
  toSelectMonth: today.getMonth(),
  toSelectYear: today.getFullYear(),
}

interface GanttContainerProps {
  resources: ResourceProps[];
}

const GanttContainer: React.FC<GanttContainerProps> = ({ resources }) => {

  return (
    <>
      <GanttLayout>
        <GanttBar />
        <div className='gantt-space-container'>
          <ResourcesBar />
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