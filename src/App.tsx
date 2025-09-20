import React, { useState, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLeagues } from './hooks/useLeagues';
import { LeagueCard } from './components/LeagueCard';
import { SearchBar } from './components/SearchBar';
import { SportFilter } from './components/SportFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Trophy, Search, RefreshCw, AlertCircle, Star } from 'lucide-react';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  
  const { data: leaguesData, isLoading, error } = useLeagues();

  const filteredLeagues = useMemo(() => {
    if (!leaguesData?.leagues) return [];
    
    return leaguesData.leagues.filter((league: any) => {
      const matchesSearch = league.strLeague
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate && 
         league.strLeagueAlternate.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSport = !selectedSport || league.strSport === selectedSport;
      
      return matchesSearch && matchesSport;
    });
  }, [leaguesData?.leagues, searchTerm, selectedSport]);

  const availableSports = useMemo(() => {
    if (!leaguesData?.leagues) return [];
    
    const sports = new Set(leaguesData.leagues.map((league: any) => league.strSport));
    return Array.from(sports).sort();
  }, [leaguesData?.leagues]);

  if (isLoading) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <div className="absolute -top-2 -right-2">
              <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <LoadingSpinner />
          <p className="text-gray-600 mt-4 font-medium">Loading sports leagues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="relative mb-6">
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
            <div className="absolute -top-2 -right-2">
              <RefreshCw className="w-8 h-8 text-red-400 animate-spin" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the sports leagues. Please check your connection and try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Sticky Header Section with Search and Filter - Full Width */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg p-6 mb-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Left Side - Title */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="relative">
                <Trophy className="w-10 h-10 text-yellow-500" />
                <div className="absolute -top-1 -right-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-black">
                  Sports Leagues
                </h1>
              </div>
            </div>

            {/* Center - Search and Filter */}
            <div className="flex-1 w-full max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search by league name..."
                  />
                </div>
                <div>
                  <SportFilter
                    value={selectedSport}
                    onChange={setSelectedSport}
                    sports={availableSports}
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Results Count */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  {filteredLeagues.length}
                </div>
                <div className="text-sm text-gray-600">
                  League{filteredLeagues.length !== 1 ? 's' : ''}
                </div>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Clear Filters Button - Only show when filters are active */}
        {(searchTerm || selectedSport) && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSport('');
              }}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              Clear All Filters
            </button>
          </div>
        )}

        {filteredLeagues.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full blur opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
                <div className="text-gray-400 mb-6">
                  <Search className="mx-auto h-16 w-16" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No leagues found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria to find more leagues.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => setSelectedSport('')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    Clear Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredLeagues.map((league: any) => (
              <LeagueCard key={league.idLeague} league={league} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
