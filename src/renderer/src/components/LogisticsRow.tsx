import React, { ComponentProps } from 'react';
import { NewBookmarkButton, SearchInput } from '@/components';


// Define the props for LogisticsRow, including the onAddBookmark function,
// which handles adding a bookmark by passing the bookmark data (title, tags, URL, notes).
interface LogisticsRowProps extends ComponentProps<'div'> {
  onAddBookmark: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
}

// Component to render the search input and the button to open the form for creating new bookmarks.
// It also handles the submission of bookmark data to be saved in the database via the parent component (App.tsx).
export const LogisticsRow: React.FC<LogisticsRowProps> = ({ onAddBookmark, ...props }) => {
  return (
    <div {...props}>
      <SearchInput />
      <NewBookmarkButton onAddBookmark={onAddBookmark} />
    </div>
  );
};
