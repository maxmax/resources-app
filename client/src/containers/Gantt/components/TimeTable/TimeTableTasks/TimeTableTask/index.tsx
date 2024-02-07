import React from 'react';
// import React, { useState } from 'react';
// import dayjs from 'dayjs';
// import { Rnd } from "react-rnd";
// import { Popover, Typography } from '@mui/material';
// import { styled } from '@mui/system';

import { dayDiff } from "@/helpers/dateFunctions";
import { TaskProps } from '@/utils/api/tasks';
import { ResourceProps } from '@/utils/api/resources';

// const PopoverStyled = styled(Popover)({
//  pointerEvents: 'none',
//  marginTop: -28
// });

// interface Task extends TaskProps {
//  optStart?: string;
// }

interface TimeTableTasksProps {
  resource: ResourceProps;
	task: TaskProps;
  previewStart?: string;
  filterData: string; // Specify the type of filterData
  index: number;
}

const TimeTableTasks: React.FC<TimeTableTasksProps> = ({
	resource,
	task,
  previewStart,
  filterData,
  index,
}) => {

	console.log('resource--', resource);
	console.log('task--', task);
	console.log('filterData--', filterData);
	console.log('previewStart--', previewStart);
	console.log('index--', index);

  return (
    <>
      <div
          // tabIndex="0"
          style={{
            width: `calc(${dayDiff(previewStart ? previewStart : task.start, task.end)} * 100% - 1px)`,
            top: `${(index + 1) > 1 ? 22 * index : 0}px`
          }}
          className={'task-duration task-status ' + task.status}
          // aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          // onMouseEnter={handlePopoverOpen}
          // onMouseLeave={handlePopoverClose}
          // onClick={(e) => updatePeriod(e)}
          data-task-index={(index + 1)}
      >
				<div className='task-background'>{task.id}</div>
			</div>
    </>
  );
};

export default TimeTableTasks;
