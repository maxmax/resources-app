import React, { FC } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useСreateResource } from '@/utils/api/resources';

interface NewResourceProps {
  open: boolean;
  close: (open: boolean) => void;
}

interface FormData {
  title: string;
  content?: string;
  priority: number;
  status: string;
  published: boolean;
}

const NewResource: FC<NewResourceProps> = ({ open, close }) => {

  const createResource = useСreateResource();

  const { handleSubmit, control, formState: { errors } } = useForm<FormData>();

  const handleClose = () => {
    close(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createResource.mutateAsync({
        ...data,
        authorEmail: "loki@example.com"
      });
    } catch (error) {
      console.error('An error occurred while create resource:', error);
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
          {"New Resource"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      variant="outlined"
                      fullWidth
                      required
                      error={!!errors.title}
                      helperText={errors.title && 'Title is required'}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
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
              <Grid item xs={6}>
                <Controller
                  name="priority"
                  control={control}
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
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="status-label"
                        id="status"
                        label="Status"
                        variant="outlined"
                        fullWidth
                        required
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="in-progress">In Progress</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Controller
                      name="published"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          color="primary"
                        />
                      )}
                    />
                  }
                  label="Published"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 4 }}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button type="submit" variant="outlined" color="success" sx={{ ml: 1 }}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default NewResource;
