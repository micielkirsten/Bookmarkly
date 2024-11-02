import React, { ComponentProps } from 'react';
import { NewBookmarkButton, SearchInput } from '@/components';

interface LogisticsRowProps extends ComponentProps<'div'> {
  onAddBookmark: (bookmarkData: { title: string; tags: string; url: string; notes: string }) => void;
}

export const LogisticsRow: React.FC<LogisticsRowProps> = ({ onAddBookmark, ...props }) => {
  return (
    <div {...props}>
      <SearchInput />
      <NewBookmarkButton onAddBookmark={onAddBookmark} />
    </div>
  );
};
