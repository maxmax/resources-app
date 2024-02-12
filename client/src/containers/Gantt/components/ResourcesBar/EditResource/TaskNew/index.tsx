import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
	Button, 
	TextField, 
	Grid, 
	MenuItem, 
	FormControl, 
	InputLabel, 
	Select,
	LocalizationProvider,
	DatePicker,
} from '@/components';
import dayjs from 'dayjs';
import { ResourceProps } from '@/utils/api/resources';
import { useСreateTask } from '@/utils/api/tasks';

interface FormInput {
  title: string;
  start: Date | null;
  end: Date | null;
  status: string;
	priority: number;
  content: string;
}

interface TaskNewProps {
  resource: ResourceProps;
	close: (open: boolean) => void;
}

const TaskNew: React.FC<TaskNewProps> = ({ resource, close }) => {

	const createTask = useСreateTask();

	const today = new Date();
  const { handleSubmit: handleSubmitForm, control: controlForm } = useForm<FormInput>();
  const [startDate, setStartDate] = useState(dayjs(today));
  const [endDate, setEndDate] = useState(dayjs(today));

  const onSubmitForm: SubmitHandler<FormInput> = async (data) => {
		const tskData = {
			...data,
			start: startDate.toDate().toISOString(),
			end: endDate.toDate().toISOString(),
			priority: Number(data.priority),
			resourceId: resource.id,
			authorEmail: "loki@example.com",
		}
    try {
      await createTask.mutateAsync(tskData);
    } catch (error) {
      console.error('An error occurred while create task:', error);
    }
		console.log(tskData)
	};

  return (
    <form onSubmit={handleSubmitForm(onSubmitForm)}>
			<LocalizationProvider>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Controller
							name="title"
							control={controlForm}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Title" variant="outlined" fullWidth required />
							)}
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
						<Controller
							name="status"
							control={controlForm}
							defaultValue=""
							render={({ field }) => (
								<FormControl variant="outlined" fullWidth required>
									<InputLabel id="status-label">Status</InputLabel>
									<Select {...field} labelId="status-label" label="Status">
										<MenuItem value="Canceled">Canceled</MenuItem>
										<MenuItem value="In Progress">In Progress</MenuItem>
										<MenuItem value="Completed">Completed</MenuItem>
										<MenuItem value="Booked">Booked</MenuItem>
									</Select>
								</FormControl>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="priority"
							control={controlForm}
							defaultValue={1}
							render={({ field }) => (
								<TextField
									{...field}
									label="Priority"
									variant="outlined"
									fullWidth
									type="number"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name="content"
							control={controlForm}
							defaultValue=""
							render={({ field }) => (
								<TextField {...field} label="Content" variant="outlined" fullWidth multiline rows={4} required />
							)}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 3 }}>
						<Button type="submit" variant="outlined" color="success" sx={{ mr: 1 }}>
							Submit
						</Button>
						<Button onClick={() => close(false)} variant="outlined">
							Close
						</Button>
					</Grid>
				</Grid>
			</LocalizationProvider>
    </form>
  );
};

export default TaskNew;
