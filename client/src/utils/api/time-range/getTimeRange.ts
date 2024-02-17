import { useQuery } from 'react-query';
import { TimeRangeProps } from './types';

const getDefaultTimeRange = async (): Promise<TimeRangeProps> => {
  const today = new Date();
  const data = {
    fromDate: new Date(today.getFullYear(), today.getMonth(), 1),
    toDate: new Date(today.getFullYear(), today.getMonth() + 1, 0),
  };
  return data;
};

export const getTimeRange = () => {
  return useQuery({
    queryKey: ['timeRange'],
    queryFn: () => getDefaultTimeRange(),
  });
};
