import { useQuery } from 'react-query';
import { TaskProps } from './types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

const getTaskById = async (id: number): Promise<TaskProps> => {
  const response = await fetch(`${API_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch task by id');
  }
  const data = await response.json();
  return data;
};

export const getTask = (taskId: number) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId),
    enabled: !!taskId,
  })
}
