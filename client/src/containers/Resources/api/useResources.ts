import { useQuery } from 'react-query';
import { ResourcesProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const useResources = () => {
  return useQuery<Array<ResourcesProps>, Error>({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/resources/`);

      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }

      const data: Array<ResourcesProps> = await response.json();
      return data;
    },
  });
}
