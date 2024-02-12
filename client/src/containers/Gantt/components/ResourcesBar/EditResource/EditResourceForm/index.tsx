import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import {
  Box,
	Button,
	TextField,
	Grid,
	Checkbox,
	FormControlLabel,
} from '@/components';
import { useUpdateResource, useDeleteResource } from '@/utils/api/resources';
import { ResourceProps } from '@/utils/api/resources';

interface EditResourceFormProps {
  resource: ResourceProps;
	close: (open: boolean) => void;
}

interface FormData {
  title: string;
  content?: string;
  priority: number;
  status: string;
  published: boolean;
}

const EditResourceForm: FC<EditResourceFormProps> = ({ resource, close }) => {

  const updateResource = useUpdateResource();
	const deleteResource = useDeleteResource();

  const { handleSubmit: handleSubmitResourceForm, control: controlResourceForm, formState: { errors: errorsResourceForm } } = useForm<FormData>({
    defaultValues: {
      title: resource.title || '',
      content: resource.content || '',
      priority: resource.priority || 1,
      status: resource.status || '',
      published: resource.published || false,
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const resourceData = {
        ...data,
				priority: Number(data.priority),
        authorEmail: "loki@example.com"
      }
      await updateResource.mutateAsync({ resourceId: resource.id, resourceData });
    } catch (error) {
      console.error('An error occurred while edit resource:', error);
    }
  };

	const handleDeleteResource = async () => {
    try {
      await deleteResource.mutateAsync(resource.id);
			close(false);
    } catch (error) {
      console.error('An error occurred while deleting resource:', error);
    }
	}

  return (
		<form onSubmit={handleSubmitResourceForm(onSubmit)}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Controller
						name="title"
						control={controlResourceForm}
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								{...field}
								label="Title"
								variant="outlined"
								fullWidth
								required
								error={!!errorsResourceForm.title}
								helperText={errorsResourceForm.title && 'Title is required'}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Controller
						name="content"
						control={controlResourceForm}
						render={({ field }) => (
							<TextField
								{...field}
								label="Content"
								variant="outlined"
								fullWidth
							/>
						)}
					/>
				</Grid>
				<Grid item xs={2}>
					<Controller
						name="priority"
						control={controlResourceForm}
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
				<Grid item xs={10}>
					<Controller
						name="status"
						control={controlResourceForm}
						render={({ field }) => (
							<TextField
								{...field}
								label="status"
								variant="outlined"
								fullWidth
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Controller
								name="published"
								control={controlResourceForm}
								render={({ field }) => (
									<Checkbox
										{...field}
										color="primary"
										checked={field.value}
									/>
								)}
							/>
						}
						label="Published"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{ mt: 3 }}>
				<Grid item xs={6}>
					<Button type="submit" variant="outlined" color="success" sx={{ mr: 1 }}>
						Submit
					</Button>
					<Button onClick={() => close(false)} variant="outlined">
						Close
					</Button>
				</Grid>
				<Grid item xs={6}>
					<Box display="flex" justifyContent="flex-end">
						<Button onClick={handleDeleteResource} variant="outlined" color="error">
							Delete
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
  );
};

export default EditResourceForm;
