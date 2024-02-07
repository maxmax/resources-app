import * as React from 'react';
import "./index.scss";

interface GanttLayoutProps {
  children: React.ReactNode
}

const GanttLayout: React.FC<GanttLayoutProps> = ({ children }) => {
  return (
    <div className='gantt-layout'>
			{children}
    </div>
  );
}

export default GanttLayout;