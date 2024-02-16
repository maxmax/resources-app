import { useQuery } from 'react-query';
import { TimeRangeProps } from './types';

const getDefaultTimeRange = async (): Promise<TimeRangeProps> => {
	const today = new Date();
	const data = {
		fromSelectDay: 1,
		fromSelectMonth: today.getMonth(),
		fromSelectYear: today.getFullYear(),
		toSelectDay: new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(),
		toSelectMonth: today.getMonth(),
		toSelectYear: today.getFullYear(),
		fromDate: today,
		toDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
	}
  return data;
};

export const getTimeRange = () => {
  return useQuery({
    queryKey: ['timeRange'],
    queryFn: () => getDefaultTimeRange(),
  })
}