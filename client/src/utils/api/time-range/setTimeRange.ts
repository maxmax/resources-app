import { useMutation, useQueryClient } from 'react-query';
import { TimeRangeProps } from './types';

const setDefaultTimeRange = async (newData: { date: Date; key: string }, queryClient: ReturnType<typeof useQueryClient>): Promise<void> => {
  const { date, key } = newData;
  const timeRangeData: TimeRangeProps | undefined = queryClient.getQueryData('timeRange');

  if (!timeRangeData) {
    return;
  }

  let newDataToUpdate: TimeRangeProps = { ...timeRangeData };

  if (key === 'from') {
    newDataToUpdate = {
      ...timeRangeData,
      fromDate: date,
    };
  } else if (key === 'to') {
    newDataToUpdate = {
      ...timeRangeData,
      toDate: date,
    };
  }

  queryClient.setQueryData('timeRange', newDataToUpdate);
};

export const setTimeRange = () => {
  const queryClient = useQueryClient();
  return useMutation((newData: { date: Date; key: string }) => setDefaultTimeRange(newData, queryClient), {
    onSuccess: () => {
      queryClient.invalidateQueries('resources');
      queryClient.invalidateQueries('tasks');
    },
  });
};