import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface LocalizationProviderComponentProps {
  children: React.ReactNode;
}

const LocalizationProviderComponent: React.FC<LocalizationProviderComponentProps> = ({ children }) => {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>;
};

export default LocalizationProviderComponent;