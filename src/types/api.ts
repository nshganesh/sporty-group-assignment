export type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
};

export type AllLeaguesResponse = {
  leagues: League[];
};

export type Season = {
  strSeason: string;
  strBadge: string;
};

export type SeasonBadgeResponse = {
  seasons: Season[];
};
