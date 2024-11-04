import React, { useEffect, useState } from 'react';
import { RootLayout, Logistics, LogisticsRow, Folders, Bookmarks, Bookmark_Content, BookmarkList } from "@/components";

interface Bookmark {
  _id?: string;
  title: string;
  tags: string;
  url: string;
  notes: string;
}

const App: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Fetch bookmarks from the database on load
  useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarksFromDB = await window.api.fetchAllBookmarks();
      const formattedBookmarks: Bookmark[] = bookmarksFromDB.map((bookmark) => bookmark._doc); // This might still have the _doc wrapper      
      console.log(formattedBookmarks); // Log the fetched bookmarks
      setBookmarks(formattedBookmarks);
    };
    fetchBookmarks();
  }, []);

  // Add a new bookmark
  const handleAddBookmark = async (newBookmark: Bookmark) => {
    const savedBookmark = await window.api.createBookmark(newBookmark);
    setBookmarks((prevBookmarks) => [...prevBookmarks, savedBookmark]);
  };

  // Delete a bookmark
  const handleDeleteBookmark = async (id: string) => {
    await window.api.deleteBookmark(id);
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark._id !== id));
  };

  return (
    <RootLayout className="text-[rgba(204,204,204,255)] flex">
      <Logistics className="p-2 bg-[rgba(24,24,24,255)] border-b-2 border-b-[rgba(43,43,43,255)] w-full">
        <LogisticsRow className="flex space-x-2 mt-1" onAddBookmark={handleAddBookmark} />
      </Logistics>
      <div className="flex flex-row w-full h-full">
        <Folders className="p-2 bg-[rgba(24,24,24,255)] w-[150px]">Folders</Folders>
        <Bookmarks className="hidden p-2">Bookmarks</Bookmarks>
        <Bookmark_Content className="flex-grow p-2 bg-[rgba(31,31,31,255)] border-l-2 border-l-[rgba(43,43,43,255)]">
          <BookmarkList bookmarks={bookmarks} onDelete={handleDeleteBookmark} />
        </Bookmark_Content>
      </div>
    </RootLayout>
  );
};

export default App;
