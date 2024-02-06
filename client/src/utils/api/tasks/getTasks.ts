import { useQuery } from 'react-query';
import { TaskProps } from './types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const getTasks = () => {
  return useQuery<Array<TaskProps>, Error>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/tasks/`);

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data: Array<TaskProps> = await response.json();
      return data;
    },
  });
}
