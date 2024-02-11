import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ResourceProps } from '@/utils/api/resources';
import EditResourceForm from './EditResourceForm';
import TaskList from './TaskList';
import TaskNew from './TaskNew';

interface EditResourceProps {
  open: boolean;
  close: (open: boolean) => void;
  resource: ResourceProps;
}

const EditResource: FC<EditResourceProps> = ({ open, close, resource }) => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    close(false);
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Resource" value="1" sx={{ px: 3, py: 3 }} />
              <Tab label="Tasks" value="2" sx={{ px: 3, py: 3 }} />
              <Tab label="New task" value="3" sx={{ px: 3, py: 3 }} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <EditResourceForm resource={resource} close={close} />
          </TabPanel>
          <TabPanel value="2">
            <TaskList tasks={resource.tasks} />
          </TabPanel>
          <TabPanel value="3"><TaskNew resource={resource} /></TabPanel>
        </TabContext>
      </Dialog>
    </React.Fragment>
  );
};

export default EditResource;
