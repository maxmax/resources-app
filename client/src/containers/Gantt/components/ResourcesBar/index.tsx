import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem
} from '@/components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ResourceProps } from '@/utils/api/resources';
import NewResource from './NewResource';

interface ResourcesBarProps {
  resources: ResourceProps[];
}

const ResourcesBar: React.FC<ResourcesBarProps> = ({ resources }) => {
  const [resourceNewModalOpen, setResourceNewModalOpen] = useState<boolean>(false);

  const addResource = () => setResourceNewModalOpen(!resourceNewModalOpen);

  return (
    <div className='gantt-resources-bar'>
      <div className='gantt-resources-bar-head'></div>
      <div className='gantt-resources-bar-list'>
        <div className='gantt-resources-bar-list-head'>
          <Typography variant="caption" display="block" sx={{ px: 2, pt: 0.3 }}>
            Resources:
            <div className="add-button" onClick={() => addResource()}><AddCircleIcon fontSize='small' /></div>
          </Typography>
        </div>
        <List sx={{ py: 0 }}>
          {resources.map((resource, index) => (
            <ListItem 
              key={index} 
              sx={{ px: 2, py: 0.3 }} 
              data-row-resource-tasks={resource?.tasks?.length}
              style={{ height: `${(resource?.tasks?.length + 1) > 1 ? 22 * (resource?.tasks?.length) : 22}px`}}
              className='gantt-resources-bar-list-item'
            >
              <Typography variant="caption" display="block">
                {resource.title}
              </Typography>
            </ListItem>
          ))} 
        </List>
      </div>
      {resourceNewModalOpen && <NewResource open={resourceNewModalOpen} close={addResource} />}
    </div>
  );
}

export default ResourcesBar;