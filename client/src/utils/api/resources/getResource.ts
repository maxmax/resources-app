import { useQuery } from 'react-query';
import { ResourceProps } from './types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

const getResourceById = async (id: number): Promise<ResourceProps> => {
  const response = await fetch(`${API_URL}/resources/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch resource by id');
  }
  const data = await response.json();
  return data;
};

export const getResource = (resourceId: number) => {
  return useQuery({
    queryKey: ['resource', resourceId],
    queryFn: () => getResourceById(resourceId),
    enabled: !!resourceId,
  })
}
