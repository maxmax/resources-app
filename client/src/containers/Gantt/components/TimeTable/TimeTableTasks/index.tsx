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
    fromDate: Date;
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
    const optStart = dayjs(`${timeRange.fromDate.getFullYear()}-${timeRange.fromDate.getMonth() + 1}-01`).format('YYYY-MM-DD');

    if (end > formattedDate && start < optStart) {
      task.optStart = optStart;
    }

    if (task.optStart === formattedDate) {
			return <TimeTableTask 
        key={i} 
        task={task}
        previewStart={task.optStart}
        index={i} />;
    } else if (start === formattedDate) {
			return <TimeTableTask 
        key={i} 
        task={task}
        index={i} />;
    } else {
      return null;
    }
  });

  return <>{tasks}</>;
};

export default TimeTableTasks;
