import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';

export const useSeasonBadge = (leagueId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: ['seasonBadge', leagueId],
    queryFn: () => api.getSeasonBadge(leagueId),
    enabled,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};
