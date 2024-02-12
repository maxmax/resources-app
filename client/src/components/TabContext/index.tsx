import React from 'react';
import TabContext, { TabContextProps } from '@mui/lab/TabContext';

const TabContextComponent: React.FC<TabContextProps> = (props) => {
  return <TabContext {...props} />;
};

export default TabContextComponent;
