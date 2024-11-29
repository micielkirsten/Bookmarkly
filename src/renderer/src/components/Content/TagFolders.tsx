import React from 'react';

const TagFolders: React.FC<TagFoldersProps> = ({ bookmarks, onSelectTag }) => {
  const tagCounts = React.useMemo(() => {
    const counts: TagCount = {};
    
    bookmarks.forEach(bookmark => {
      const bookmarkData = bookmark._doc || bookmark;
      const tags = bookmarkData.tags?.split(',').filter(tag => tag.trim()) || [];
      
      tags.forEach(tag => {
        const trimmedTag = tag.trim();
        counts[trimmedTag] = (counts[trimmedTag] || 0) + 1;
      });
    });
    
    return counts;
  }, [bookmarks]);

  const getUntaggedCount = () => 
    bookmarks.filter(b => !(b._doc || b).tags?.trim()).length;

  return (
    <div className="flex flex-col space-y-2">
      <div 
        className="flex items-center space-x-2 px-2 py-1 hover:bg-[rgba(43,43,43,255)] cursor-pointer rounded"
        onClick={() => onSelectTag?.(undefined)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>All Bookmarks</span>
        <span className="text-sm text-gray-500">({bookmarks.length})</span>
      </div>

      <div 
        className="flex items-center space-x-2 px-2 py-1 hover:bg-[rgba(43,43,43,255)] cursor-pointer rounded"
        onClick={() => onSelectTag?.('untagged')}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <span>Untagged</span>
        <span className="text-sm text-gray-500">({getUntaggedCount()})</span>
      </div>

      <div className="border-t border-[rgba(43,43,43,255)] my-2"></div>

      {Object.entries(tagCounts)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([tag, count]) => (
          <div
            key={tag}
            className="flex items-center space-x-2 px-2 py-1 hover:bg-[rgba(43,43,43,255)] cursor-pointer rounded"
            onClick={() => onSelectTag?.(tag)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span>{tag}</span>
            <span className="text-sm text-gray-500">({count})</span>
          </div>
        ))}
    </div>
  );
};

export default TagFolders;