import { useMutation, useQueryClient } from 'react-query';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const deleteResource = async (resourceId: number) => {

  const response = await fetch(`${API_URL}/resources/${resourceId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete resource');
  }

  const responseData = await response.json();
  return responseData;
};

export const useDeleteResource = () => {
	const queryClient = useQueryClient();
  return useMutation(deleteResource, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};