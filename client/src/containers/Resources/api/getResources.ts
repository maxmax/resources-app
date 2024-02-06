import { useQuery } from 'react-query';
import { ResourceProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const getResources = () => {
  return useQuery<Array<ResourceProps>, Error>({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/resources/`);

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data: Array<ResourceProps> = await response.json();
      return data;
    },
  });
}
