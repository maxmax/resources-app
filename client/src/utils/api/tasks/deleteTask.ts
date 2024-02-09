import { useMutation, useQueryClient } from 'react-query';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const deleteTask = async (taskId: number) => {

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  const responseData = await response.json();
  return responseData;
};

export const useDeleteTask = () => {
	const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};