import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DatePickerComponentProps extends DatePickerProps<Date | Dayjs> {}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  return <DatePicker {...props} />;
};

export default DatePickerComponent;
