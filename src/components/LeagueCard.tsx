import React, { useState } from 'react';
import { League } from '../types/api';
import { useSeasonBadge } from '../hooks/useSeasonBadge';
import { Trophy, Star, Eye, EyeOff, Loader2, Award } from 'lucide-react';

interface LeagueCardProps {
  league: League;
}

// Sport-specific color mapping
const getSportColor = (sport: string) => {
  const sportColors: { [key: string]: string } = {
    'Soccer': 'from-green-500 to-emerald-600',
    'Basketball': 'from-orange-500 to-red-600',
    'American Football': 'from-blue-500 to-indigo-600',
    'Baseball': 'from-yellow-500 to-amber-600',
    'Hockey': 'from-slate-500 to-gray-600',
    'Tennis': 'from-lime-500 to-green-600',
    'Golf': 'from-emerald-500 to-teal-600',
    'Cricket': 'from-red-500 to-rose-600',
    'Rugby': 'from-purple-500 to-violet-600',
    'Boxing': 'from-red-600 to-pink-600',
    'Motorsport': 'from-gray-600 to-slate-700',
    'Cycling': 'from-cyan-500 to-blue-600',
  };
  return sportColors[sport] || 'from-blue-500 to-indigo-600';
};

export const LeagueCard: React.FC<LeagueCardProps> = ({ league }) => {
  const [showBadge, setShowBadge] = useState(false);
  const { data: badgeData, isLoading: badgeLoading } = useSeasonBadge(
    league.idLeague,
    showBadge
  );

  const handleClick = () => {
    setShowBadge(!showBadge);
  };

      // Get the most recent season badge (last in the array, or first if only one)
      const seasons = (badgeData as any)?.seasons;
      const recentSeason = seasons?.length > 0 ? seasons[seasons.length - 1] : null;
      const badgeUrl = recentSeason?.strBadge;
      const seasonName = recentSeason?.strSeason;
  const sportColor = getSportColor(league.strSport);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden transform hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${sportColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Header with sport indicator */}
      <div className={`relative p-4 pb-3 bg-gradient-to-r ${sportColor} text-white`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              {league.strSport}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
            <Star className="w-3 h-3 fill-current" />
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1 line-clamp-2">
          {league.strLeague}
        </h3>
        
        {league.strLeagueAlternate && (
          <p className="text-xs opacity-90 line-clamp-1">
            {league.strLeagueAlternate}
          </p>
        )}
      </div>

      {/* Content area */}
      <div className="p-4 pt-3 min-h-[140px] flex flex-col">
        {/* Badge section */}
        {showBadge && (
          <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 shadow-sm">
            <div className="flex items-center justify-center">
              {badgeLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-600 font-medium">Loading badge...</span>
                </div>
              ) : badgeUrl ? (
                <div className="relative">
                  <img
                    src={badgeUrl}
                    alt={`${league.strLeague} ${seasonName ? seasonName + ' ' : ''}badge`}
                    className="w-24 h-24 object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 shadow-md">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  {seasonName && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                      {seasonName}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-md">
                    <Trophy className="w-10 h-10 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500 font-medium">No badge available</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action button - positioned at bottom */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            {showBadge ? (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>Show</span>
              </>
            )}
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${sportColor} text-white`}>
            {league.strSport}
          </div>
        </div>
      </div>

      {/* Hover effect indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};
