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
    <div {...props}>
      <SearchInput onChange={handleSearchChange} placeholder="Search bookmarks..." />
      <NewBookmarkButton onAddBookmark={onAddBookmark} />
    </div>
  );
};
