import { useQuery } from 'react-query';
import { UserProps } from './types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

const getUserById = async (id: number): Promise<UserProps> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user by id');
  }
  const data = await response.json();
  return data;
};

export const getUser = (userId: number) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  })
}
