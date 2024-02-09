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
import { useUpdateTask, useDeleteTask } from '@/utils/api/tasks';

const statuses = ['In Progress', 'Completed', 'Canceled']

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

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

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

  const handleSubmit = async () => {
    try {
      const taskData = {
        title: attributes.title,
        content: attributes.content || '',
        start: startDate.toDate().toISOString(),
        end: endDate.toDate().toISOString(),
        status: status,
      }
      await updateTask.mutateAsync({ taskId: task.id, taskData });
    } catch (error) {
      console.error('An error occurred while updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask.mutateAsync(task.id);
      setClose();
    } catch (error) {
      console.error('An error occurred while deleting task:', error);
    }
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
					<Box sx={{ mt: 2, mb: 0 }}>
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
          <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
            <Grid item xs={6}>
              <Button onClick={handleClose} variant="outlined">Cancel</Button>
              <Button onClick={handleSubmit} variant="outlined" color="success" sx={{ ml: 1 }} autoFocus>Submit</Button>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={handleDeleteTask} variant="outlined" color="error">Delete</Button>
              </Box>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TaskUpdateDialog;
