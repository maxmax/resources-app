import React, { FC, useState } from 'react';
import {
	Button, 
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
	LocalizationProvider,
	DatePicker,
  DialogTitle,
} from '@/components';
import Select, { SelectChangeEvent } from '@/components/Select';
import dayjs from 'dayjs';
import { TaskProps } from '@/utils/api/tasks';
import { useUpdateTask, useDeleteTask } from '@/utils/api/tasks';

const statuses = ['In Progress', 'Completed', 'Canceled', 'Booked']

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

  const handleChangeStatus = (e: SelectChangeEvent<unknown>) => {
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
						<LocalizationProvider>
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
										onChange={(newValue) => newValue && setStartDate(dayjs(newValue))}
									/>
								</Grid>
								<Grid item xs={4}>
									<DatePicker
										label="End"
										format="DD-MM-YYYY"
										value={endDate}
										onChange={(newValue) => newValue && setEndDate(dayjs(newValue))}
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
              <Button onClick={handleSubmit} variant="outlined" color="success" autoFocus>Submit</Button>
              <Button onClick={handleClose} variant="outlined" sx={{ ml: 1 }}>Cancel</Button>
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
