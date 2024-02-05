import { useQuery } from 'react-query';
import { UserProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

const getUserById = (id: number): Promise<UserProps> => {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user by id');
      }
      return response.json();
    })
    .then(data => data);
};

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  })
}
