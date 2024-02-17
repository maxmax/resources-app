import React from 'react';
import dayjs from 'dayjs';
import { 
	Box, 
	Grid, 
	Typography, 
	IconButton, 
	LocalizationProvider,
	Button
} from '@/components';
import { Popover } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { EventRepeat } from '@mui/icons-material';
import { getTimeRange, setTimeRange } from '@/utils/api/time-range';

interface SelectDateContainerProps {}

const SelectDateContainer: React.FC<SelectDateContainerProps> = () => {

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
	const [selectedDateKey, setSelectedDateKey] = React.useState<string | null>(null);

	const { data: timeRangeData } = getTimeRange();
	const { mutate: updateTimeRange } = setTimeRange();

	const dateReplay = async () => {
		updateTimeRange({
			date: new Date(),
			key: 'reset',
		});
	};

  const openDateCalendar = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, date: Date, key: string) => {
		setSelectedDate(date);
		setSelectedDateKey(key);
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
		setSelectedDate(null);
		setSelectedDateKey(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

	const updateDate = async () => {
		if (selectedDate && selectedDateKey) {
			updateTimeRange({
				date: selectedDate,
				key: selectedDateKey,
			});
			handleClose();
		}
  };

  return (
    <Box sx={{ height: '44px', pt: 2 }}>
			{timeRangeData &&
				<Grid container spacing={0}>
					<Grid item xs={5}>
						<Typography 
							aria-describedby={id} 
							onClick={(e) => openDateCalendar(e, timeRangeData.fromDate, 'from')} 
							sx={{fontSize: 12, cursor: 'pointer'}} 
							align="right">{dayjs(timeRangeData.fromDate).format('DD-MMM-YYYY')}</Typography>
					</Grid>
					<Grid item xs={2}>
						<Box sx={{ textAlign: 'center', mt: -1.3 }}>
							<IconButton aria-label="delete" onClick={() => dateReplay()}>
								<EventRepeat fontSize="small" />
							</IconButton>
						</Box>
					</Grid>
					<Grid item xs={5}>
						<Typography 
							aria-describedby={id} 
							onClick={(e) => openDateCalendar(e, timeRangeData.toDate, 'to')}  
							sx={{fontSize: 12, cursor: 'pointer'}} 
							align="left">{dayjs(timeRangeData.toDate).format('DD-MMM-YYYY')}</Typography>
					</Grid>
				</Grid>
			}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <LocalizationProvider>
					<DateCalendar value={dayjs(selectedDate)} onChange={(newValue) => setSelectedDate(newValue.$d)} />
					<Button variant="contained" sx={{mt: 0, ml: 2, mb: 2}} onClick={updateDate}>Select date</Button>
				</LocalizationProvider>
      </Popover>
    </Box>
  );
};

export default SelectDateContainer;
