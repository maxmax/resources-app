import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
	Rnd,
	ResizeDirection,
	DraggableEvent,
	DraggableEventHandlerData,
	Position,
} from "react-rnd";
import { dayDiff } from "@/helpers/dateFunctions";
import { TaskProps } from '@/utils/api/tasks';
import TaskUpdateDialog from './TaskUpdateDialog';

interface TimeTableTasksProps {
	task: TaskProps;
  previewStart?: string;
  index: number;
}

interface StatePosition {
	width: string;
	height: number | string;
	x: number;
	y: number;
}

const resizeDirections = {
	bottom: false,
	bottomLeft: false,
	bottomRight: false,
	left: true,
	right: true,
	top: false,
	topLeft: false,
	topRight: false,
}

const PopoverStyled = styled(Popover)({
  pointerEvents: 'none',
  marginTop: -28
});

const TimeTableTasks: React.FC<TimeTableTasksProps> = ({
	task,
  previewStart,
  index,
}) => {

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const [resizableDate, setResizableDate] = useState<{ start: string; end: string }>({
		start: "",
		end: "",
	});
	const [openedPeriod, setOpenedPeriod] = useState<boolean>(false);

  const [statePosition, setStatePosition] = useState<StatePosition>({
    width: `100%`,
    height: 22,
    x: 0,
    y: 0
  });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const changeOpenedPeriod = () => {
    handlePopoverClose()
    setOpenedPeriod(false)
    setResizableDate({
			start: "",
			end: "",
		});
    setStatePosition({
      width: `100%`,
      height: 22,
      x: 0,
      y: 0
    })
  }

  const updatePeriod = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpenedPeriod(true);
  }

  const onResizeStop = (
    e: DraggableEvent,
    direction: ResizeDirection,
    ref: HTMLElement,
    position: Position
	) => {
    e.stopPropagation();

    setStatePosition({
      width: ref.style.width,
      height: ref.style.height,
      ...position,
    });

    if (direction === 'left') {
      setResizableDate({
        ...resizableDate,
        start: getElementDate(e.x, e.y) || task.start
      })
			setOpenedPeriod(true);
			handlePopoverClose();
    } else {
      setResizableDate({
        ...resizableDate,
        end: getElementDate(e.x, e.y) || task.end
      })
			setOpenedPeriod(true);
			handlePopoverClose();
    }
  }

	const onChangePosition = (
		e: DraggableEvent,
		data: DraggableEventHandlerData
	) => {
		e.stopPropagation();
		const rect = data.node.getBoundingClientRect();
		setStatePosition({
			...statePosition,
      x: data.x,
		});

    setResizableDate({
      ...resizableDate,
      start: getElementDate((rect.x + 4), e.y) || task.start,
      end: getElementDate((rect.right - 4), e.y) || task.end
    })

		setOpenedPeriod(true);
		handlePopoverClose();
	}

  const getElementDate = (x: number, y: number) => {
    return document.elementsFromPoint(x, y).find((el) => el.className === "gantt-time-period-cell")?.getAttribute("data-date");
  }

  return (
    <>
      <div
          style={{
            width: `calc(${dayDiff(previewStart ? previewStart : task.start, task.end)} * 100% - 1px)`,
            top: `${(index + 1) > 1 ? 22 * index : 0}px`
          }}
          className={'task-duration task-status ' + (task.status.toLowerCase().replace(/\s+/g, '-'))}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          onClick={(e) => updatePeriod(e)}
          data-task-index={(index + 1)}
      >
				<Rnd
					className="resizable-element"
					enableResizing={resizeDirections}
					default={{
						x: 0,
						y: 0,
						width: `100%`,
						height: 22
					}}
					size={{ width: statePosition.width, height: statePosition.height }}
					position={{ x: statePosition.x, y: statePosition.y }}
					minHeight="22"
					maxHeight="22"
					onDragStop={(e, data) => { onChangePosition(e, data) }}
					disableDragging={false}
					dragAxis={'x'}
					onResizeStop={(e, direction, ref, delta, position) => onResizeStop(e, direction, ref, position)}
				>
					<div className='task-background'></div>
				</Rnd>
			</div>
      <PopoverStyled
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="subtitle2" sx={{ p: 1, pb: 0, textAlign: 'center' }}>{task.title}</Typography>
				<Typography variant="caption" sx={{ p: 1, pt: 0, pb: 0, textAlign: 'center' }} display="block">
					{dayjs(task.start).format('DD-MMM-YYYY')} - {dayjs(task.end).format('DD-MMM-YYYY')}
				</Typography>
				<Typography variant="caption" sx={{ p: 1, pt: 0, textAlign: 'center' }} display="block">
					{task.status}
				</Typography>
      </PopoverStyled>
      {openedPeriod &&
				<>
					<TaskUpdateDialog 
						open={openedPeriod}
						setClose={changeOpenedPeriod}
						task={task}
						resizableDate={resizableDate}
					/>
				</>
      }
    </>
  );
};

export default TimeTableTasks;
