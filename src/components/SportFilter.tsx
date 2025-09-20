import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface SportFilterProps {
  value: string;
  onChange: (value: string) => void;
  sports: string[];
}

export const SportFilter: React.FC<SportFilterProps> = ({ 
  value, 
  onChange, 
  sports 
}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Filter className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-8 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 rounded-lg bg-white font-normal shadow-sm hover:shadow-md focus:shadow-md transition-all duration-200 appearance-none cursor-pointer"
      >
        <option value="">All Sports</option>
        {sports.map((sport) => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
      </div>
      {value && (
        <div className="absolute inset-y-0 right-8 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};
