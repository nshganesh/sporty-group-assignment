import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: api.getAllLeagues,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
