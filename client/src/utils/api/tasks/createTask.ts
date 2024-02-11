import { useMutation, useQueryClient } from 'react-query';
import { CreateTaskProps } from './types';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const createTask = async (taskData: CreateTaskProps) => {

  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Failed to create tasks');
  }

  const responseData = await response.json();
  return responseData;
};

export const useСreateTask = () => {
	const queryClient = useQueryClient();
  return useMutation(createTask, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};