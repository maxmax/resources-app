import * as React from 'react';
import Typography from '@mui/material/Typography';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <>
			<Typography variant="h4" component="h1" gutterBottom>
				{title}
			</Typography>
    </>
  );
}

export default PageHeader;
