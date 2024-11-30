import React, { useEffect, useState, useCallback } from 'react';
import { RootLayout, Logistics, LogisticsRow, Folders, Bookmark_Content, BookmarkList, TagFolders, LoginPage } from "@/components";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

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
    let filtered = bookmarks;

    if (selectedTag) {
      if (selectedTag === 'untagged') {
        filtered = filtered.filter(bookmark => {
          const tags = (bookmark._doc || bookmark).tags;
          return !tags || tags.trim() === '';
        });
      } else {
        filtered = filtered.filter(bookmark => {
          const tags = (bookmark._doc || bookmark).tags;
          return tags?.split(',').map(tag => tag.trim()).includes(selectedTag);
        });
      }
    }

    if (searchQuery) {
      filtered = filtered.filter(bookmark => 
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.tags?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [bookmarks, selectedTag, searchQuery]);

  return isAuthenticated ? (
    <RootLayout className="text-blue-900 flex">
      <Logistics className="p-2 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 border-b-2 border-b-blue-500 w-full shadow-md">
        <LogisticsRow className="flex space-x-2 mt-1" onAddBookmark={handleAddBookmark} onSearch={setSearchQuery} />
      </Logistics>
      <div className="flex flex-row w-full h-full">
        <Folders className="p-2 bg-gradient-to-b from-blue-50 to-white w-[200px] border-r border-r-blue-200 shadow-inner">
          <h2 className="text-lg font-semibold text-blue-700 mb-4">Folders</h2>
          <TagFolders 
            bookmarks={bookmarks} 
            onSelectTag={setSelectedTag} 
          />
        </Folders>
        <Bookmark_Content className="flex-grow p-4 bg-gradient-to-b from-gray-50 to-white border-l-2 border-l-blue-300 shadow-md">
          {filteredBookmarks().length === 0 ? (
            <p className="text-gray-500 text-center mt-4">No bookmarks to display</p>
          ) : (
            <BookmarkList bookmarks={filteredBookmarks()} onDelete={handleDeleteBookmark} />
          )}
        </Bookmark_Content>
      </div>
    </RootLayout>
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
};

export default App;
