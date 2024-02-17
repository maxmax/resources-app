import { useQuery } from 'react-query';
import { ResourceProps } from './types';

const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const getResourcesByFilterReq = async (start: Date, end: Date) => {
  const response = await fetch(`${API_URL}/resources/tasks?start=${start.toISOString()}&end=${end.toISOString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch resources by filter');
  }

  const data: Array<ResourceProps> = await response.json();
  return data;
};

export const getResourcesByFilter = (start: Date, end: Date) => {
  return useQuery<Array<ResourceProps>, Error>(['resources', start, end], () => getResourcesByFilterReq(start, end));
};
