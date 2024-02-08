import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TaskProps } from '@/utils/api/tasks';

const statuses = ['In Progress', 'Complete', 'Canceled']

interface TaskUpdateDialogProps {
  open: boolean;
  setClose: () => void;
	task: TaskProps;
	resizableDate: {
		start: string;
		end: string;
	}
}

const TaskUpdateDialog: FC<TaskUpdateDialogProps> = ({ open, setClose, task, resizableDate }) => {

  const [startDate, setStartDate] = useState(dayjs(resizableDate.start || task.start));
  const [endDate, setEndDate] = useState(dayjs(resizableDate.end || task.end));
	const [status, setStatus] = useState(task.status);
  const [attributes, setAttributes] = useState({
    title: task.title,
    content: task.content,
  });

  const handleClose = () => {
    setClose();
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value as string);
  };

  const handleChangeAttributes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributes({
      ...attributes,
      [e.target.name]: e.target.value
    });
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit " + task.title}
        </DialogTitle>
        <DialogContent>
					<Box sx={{ mt: 4, mb: 4 }}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    value={attributes.title}
                    onChange={handleChangeAttributes}
                  />
                </Grid>
								<Grid item xs={4}>
									<DatePicker
										label="Start"
										format="DD-MM-YYYY"
										value={startDate}
										onChange={(newValue) => newValue && setStartDate(newValue)}
									/>
								</Grid>
								<Grid item xs={4}>
									<DatePicker
										label="End"
										format="DD-MM-YYYY"
										value={endDate}
										onChange={(newValue) => newValue && setEndDate(newValue)}
									/>
								</Grid>
                <Grid item xs={4}>  
                  <FormControl fullWidth>
                    <InputLabel id="update-period-select-status">Status</InputLabel>
                    <Select
                      labelId="update-period-select-status"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChangeStatus}
                    >
                      {statuses?.map((item, i) => (
                        <MenuItem value={item} key={`${i}-update-task-status`}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="content"
                    name="content"
                    label="Content"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={attributes.content}
                    onChange={handleChangeAttributes}
                  />
                </Grid>
							</Grid>
						</LocalizationProvider>
					</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TaskUpdateDialog;
