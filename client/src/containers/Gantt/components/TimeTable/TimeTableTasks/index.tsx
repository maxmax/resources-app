import React from 'react';
import dayjs from 'dayjs';
import { TaskProps } from '@/utils/api/tasks';
import TimeTableTask from './TimeTableTask';

interface Task extends TaskProps {
	optStart?: string;
}

interface TimeTableTasksProps {
  currentResource: {
    tasks?: Task[];
  };
  formattedDate: string;
  timeRange: {
    fromSelectYear: number;
    fromSelectMonth: number;
  };
}

const TimeTableTasks: React.FC<TimeTableTasksProps> = ({
  currentResource,
  formattedDate,
  timeRange,
}) => {
  const tasks = currentResource?.tasks?.map((task, i) => {
    const start = dayjs(task.start).format('YYYY-MM-DD');
    const end = dayjs(task.end).format('YYYY-MM-DD');
    const optStart = `${timeRange.fromSelectYear}-${timeRange.fromSelectMonth + 1}-01`;

    if (end > formattedDate && start < optStart) {
      task.optStart = optStart;
    }

    if (task.optStart === formattedDate || start === formattedDate) {
      // return <span key={i}>x</span>;
			return <TimeTableTask key={i} resource={currentResource} task={task} filterData={'test'} index={i} />;
    } else {
      return null;
    }
  });

  return <>{tasks}</>;
};

export default TimeTableTasks;
