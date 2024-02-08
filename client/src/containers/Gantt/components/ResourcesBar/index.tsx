import * as React from 'react';
import {
  Typography,
  List,
  ListItem
} from '@/components';
import { ResourceProps } from '@/utils/api/resources';

interface ResourcesBarProps {
  resources: ResourceProps[];
}

const ResourcesBar: React.FC<ResourcesBarProps> = ({ resources }) => {

  return (
    <div className='gantt-resources-bar'>
      <div className='gantt-resources-bar-head'></div>
      <div className='gantt-resources-bar-list'>
        <div className='gantt-resources-bar-list-head'>
          <Typography variant="caption" display="block" sx={{ px: 2, pt: 0.3 }}>
            Resources:
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
    </div>
  );
}

export default ResourcesBar;