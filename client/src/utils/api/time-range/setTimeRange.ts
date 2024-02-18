import { useMutation, useQueryClient } from 'react-query';
import { TimeRangeProps } from './types';
import { getResourcesByFilterRequest } from '@/utils/api/resources';

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
  } else if (key === 'reset') {
    newDataToUpdate = {
      fromDate: date,
      toDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  }

  queryClient.setQueryData('timeRange', newDataToUpdate);

  // Get resources for the new time range and update the data
  const resourcesData = await getResourcesByFilterRequest(newDataToUpdate.fromDate, newDataToUpdate.toDate);
  queryClient.setQueryData('resources', resourcesData);
};

export const setTimeRange = () => {
  const queryClient = useQueryClient();
  return useMutation((newData: { date: Date; key: string }) => setDefaultTimeRange(newData, queryClient));
};
