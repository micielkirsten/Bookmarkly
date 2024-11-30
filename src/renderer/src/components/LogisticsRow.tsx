import React, { ComponentProps } from 'react';
import { NewBookmarkButton, SearchInput } from '@/components';

interface LogisticsRowProps extends ComponentProps<'div'> {
  onAddBookmark: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
  onSearch: (query: string) => void; // Add a prop to handle search query changes
}

export const LogisticsRow: React.FC<LogisticsRowProps> = ({ onAddBookmark, onSearch, ...props }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value); // Call the onSearch prop to update the search query in the parent component
  };

  return (
    <div {...props} className="flex items-center gap-4">
      <SearchInput 
        onChange={handleSearchChange} 
        placeholder="Search bookmarks..." 
        className="w-1/3 px-2 py-1 rounded-md border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-100"
      />
      <NewBookmarkButton 
        onAddBookmark={onAddBookmark} 
        className="ml-auto px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm"
      />
    </div>
  );
};
