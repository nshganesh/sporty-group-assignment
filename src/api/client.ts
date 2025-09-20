import axios from 'axios';
import { AllLeaguesResponse, SeasonBadgeResponse } from '../types/api';

const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const api = {
  getAllLeagues: async (): Promise<AllLeaguesResponse> => {
    const response = await apiClient.get('/all_leagues.php');
    return response.data;
  },
  
  getSeasonBadge: async (leagueId: string): Promise<SeasonBadgeResponse> => {
    const response = await apiClient.get(`/search_all_seasons.php?badge=1&id=${leagueId}`);
    return response.data;
  },
};
