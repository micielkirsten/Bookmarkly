import React, { useEffect, useState, useCallback } from 'react';
import { RootLayout, Logistics, LogisticsRow, Folders, Bookmarks, Bookmark_Content, BookmarkList, TagFolders} from "@/components";

const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const refreshBookmarks = useCallback(async () => {
    console.log('Refreshing bookmarks...');
    const bookmarksFromDB = await window.api.fetchAllBookmarks();
    const formattedBookmarks: Bookmark[] = bookmarksFromDB.map((bookmark) => bookmark._doc || bookmark);
    console.log('Updated bookmarks:', formattedBookmarks);
    setBookmarks(formattedBookmarks);
  }, []);

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks]);

  const handleAddBookmark = async (newBookmark: Bookmark) => {
    try {
      const result = await window.api.createBookmark({
        ...newBookmark,
        _doc: {
          title: newBookmark.title,
          tags: newBookmark.tags,
          url: newBookmark.url,
          notes: newBookmark.notes,
          createdAt: new Date(),
          _id: ""
        }
      });
      if (!result) {
        console.error('Failed to create bookmark');
        return;
      }
      await refreshBookmarks();
    } catch (error) {
      console.error('Error creating bookmark:', error);
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    try {
      console.log('Attempting to delete bookmark:', id);
      const result = await window.api.deleteBookmark(id);
      await refreshBookmarks();
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  const filteredBookmarks = useCallback(() => {
    if (!selectedTag) return bookmarks;
    
    if (selectedTag === 'untagged') {
      return bookmarks.filter(bookmark => {
        const tags = (bookmark._doc || bookmark).tags;
        return !tags || tags.trim() === '';
      });
    }

    return bookmarks.filter(bookmark => {
      const tags = (bookmark._doc || bookmark).tags;
      return tags?.split(',').map(tag => tag.trim()).includes(selectedTag);
    });
  }, [bookmarks, selectedTag]);

  return (
    <RootLayout className="text-[rgba(204,204,204,255)] flex">
      <Logistics className="p-2 bg-[rgba(24,24,24,255)] border-b-2 border-b-[rgba(43,43,43,255)] w-full">
        <LogisticsRow className="flex space-x-2 mt-1" onAddBookmark={handleAddBookmark} />
      </Logistics>
      <div className="flex flex-row w-full h-full">
        <Folders className="p-2 bg-[rgba(24,24,24,255)] w-[150px]">
          <TagFolders 
            bookmarks={bookmarks} 
            onSelectTag={setSelectedTag} 
          />
        </Folders>
        <Bookmarks className="hidden p-2">Bookmarks</Bookmarks>
        <Bookmark_Content className="flex-grow p-2 bg-[rgba(31,31,31,255)] border-l-2 border-l-[rgba(43,43,43,255)]">
          <BookmarkList bookmarks={filteredBookmarks()} onDelete={handleDeleteBookmark} />
        </Bookmark_Content>
      </div>
    </RootLayout>
  );
};

export default App;