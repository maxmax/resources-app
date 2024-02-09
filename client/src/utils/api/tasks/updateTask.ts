import { useMutation, useQueryClient } from 'react-query';
import { UpdateTaskProps } from './types';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const updateTask = async (data: { taskId: number; taskData: UpdateTaskProps }) => {
  const { taskId, taskData } = data;

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const responseData = await response.json();
  return responseData;
};

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};