import { useMutation, useQueryClient } from 'react-query';
import { UpdateTaskProps } from './types';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const updateResource = async (data: { resourceId: number; resourceData: UpdateTaskProps }) => {
  const { resourceId, resourceData } = data;

  console.log('resource-resourceId', resourceId);
  console.log('resource-resourceData', resourceData);

  const response = await fetch(`${API_URL}/resources/${resourceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resourceData),
  });

  if (!response.ok) {
    throw new Error('Failed to update resources');
  }

  const responseData = await response.json();
  return responseData;
};

export const useUpdateResource = () => {
	const queryClient = useQueryClient();
  return useMutation(updateResource, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};