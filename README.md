# Sports Leagues SPA

A React-based Single Page Application that displays sports leagues with filtering capabilities and season badge integration.

## Features

- **League Display**: Shows sports leagues with name, sport type, and alternate names
- **Search Functionality**: Real-time search by league name (including alternate names)
- **Sport Filtering**: Dropdown filter to filter leagues by sport type
- **Season Badge Integration**: Click on any league to fetch and display its season badge
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS
- **Caching**: API responses are cached to avoid unnecessary repeat calls
- **Loading States**: Proper loading indicators and error handling

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TanStack Query (React Query)** for server state management and caching
- **Axios** for HTTP requests
- **Tailwind CSS** for styling
- **TheSportsDB API** for data

## AI Tools Used

This project was developed with assistance from AI tools:

1. **Claude Sonnet 4** - Used for:
   - Code scaffolding and component structure
   - TypeScript interface definitions
   - React Query setup and configuration
   - Tailwind CSS styling and responsive design
   - Error handling and loading state implementation

2. **Cursor AI** - Used for:
   - Code completion and suggestions
   - Refactoring assistance
   - Bug detection and fixes

## Design Decisions

### Architecture
- **Component-based architecture**: Separated concerns into reusable components (LeagueCard, SearchBar, SportFilter, LoadingSpinner)
- **Custom hooks**: Created `useLeagues` and `useSeasonBadge` hooks for data fetching logic
- **TypeScript**: Full type safety with interfaces for API responses

### State Management
- **React Query**: Chosen for server state management due to:
  - Built-in caching capabilities
  - Automatic refetching and background updates
  - Loading and error state handling
  - Optimistic updates support

### UI/UX Design
- **Mobile-first responsive design**: Grid layout that adapts from 1 column on mobile to 3 columns on desktop
- **Clean, modern interface**: Using Tailwind CSS for consistent styling
- **Interactive elements**: Hover effects, loading states, and clear visual feedback
- **Accessibility**: Proper labels, semantic HTML, and keyboard navigation support

### Performance Optimizations
- **Memoized filtering**: Using `useMemo` to prevent unnecessary re-computations
- **API caching**: 5-minute stale time for leagues, 10-minute for badges
- **Lazy loading**: Season badges only load when requested
- **Error boundaries**: Graceful error handling with user-friendly messages

### API Integration
- **TheSportsDB API**: Free sports data API with comprehensive league information
- **Error handling**: Proper error states and fallbacks for failed requests
- **Timeout configuration**: 10-second timeout to prevent hanging requests

## Getting Started

### Prerequisites
- **Node.js version 20.19.4** or higher
- npm (comes with Node.js)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`)

### Node.js Version Management
If you're using nvm (Node Version Manager), you can switch to the required version:
```bash
nvm use 20.19.4
```

## Project Structure

```
src/
├── api/
│   └── client.ts          # API client configuration
├── components/
│   ├── LeagueCard.tsx     # Individual league display component
│   ├── SearchBar.tsx      # Search input component
│   ├── SportFilter.tsx    # Sport type filter dropdown
│   └── LoadingSpinner.tsx # Loading indicator component
├── hooks/
│   ├── useLeagues.ts      # Hook for fetching leagues
│   └── useSeasonBadge.ts  # Hook for fetching season badges
├── types/
│   └── api.ts             # TypeScript interfaces
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles with Tailwind
```

## API Endpoints Used

- **All Leagues**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
- **Season Badge**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id={leagueId}`

## Future Enhancements

- Add pagination & debouncing for large datasets
- Improvise on SEO for better listing on Google.
- Implement league details modal/page
- Add favorite leagues functionality
- Include league statistics and additional metadata
- Add dark mode toggle
- Implement advanced filtering options (by country, year, etc.)
