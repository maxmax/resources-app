import { useMutation, useQueryClient } from 'react-query';
import { CreateTaskProps } from './types';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const createResource = async (resourceData: CreateTaskProps) => {

  const response = await fetch(`${API_URL}/resources`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resourceData),
  });

  if (!response.ok) {
    throw new Error('Failed to create resources');
  }

  const responseData = await response.json();
  return responseData;
};

export const useСreateResource = () => {
	const queryClient = useQueryClient();
  return useMutation(createResource, {
    onSuccess: () => {
			queryClient.invalidateQueries('resources');
			queryClient.invalidateQueries('tasks');
    },
  });
};