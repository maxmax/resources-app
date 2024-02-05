import { useQuery } from 'react-query';
import { UserProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const useUsers = () => {
  return useQuery<Array<UserProps>, Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/`);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data: Array<UserProps> = await response.json();
      return data;
    },
  });
}
