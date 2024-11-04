import React, { useEffect, useState } from 'react';
import { RootLayout, Logistics, LogisticsRow, Folders, Bookmarks, Bookmark_Content } from "@/components";

interface Bookmark {
  _id?: string;
  title: string;
  tags: string;
  url: string;
  notes: string;
}

const App: React.FC = () => {
  // State to store the list of bookmarks fetched from the database
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Fetch bookmarks from the database on load
  useEffect(() => {
    const fetchBookmarks = async () => {

      // Fetch all bookmarks from the main process through the API exposed in the preload script
      const bookmarksFromDB = await window.api.fetchAllBookmarks();
      // Update the state with the fetched bookmarks
      setBookmarks(bookmarksFromDB);
    };
    fetchBookmarks(); // Call the function to fetch bookmarks
  }, []); // Empty dependency array to ensure this only runs once on component mount

  // Add a new bookmark
  const handleAddBookmark = async (newBookmark: Bookmark) => {

    // Send the new bookmark data to the main process to be saved in the database
    const savedBookmark = await window.api.createBookmark(newBookmark);
    // Update the state by adding the newly saved bookmark to the existing list
    setBookmarks((prevBookmarks) => [...prevBookmarks, savedBookmark]);
  };

  // Delete a bookmark
  const handleDeleteBookmark = async (id: string) => {

    // Send the bookmark ID to the main process to delete the corresponding bookmark in the database
    await window.api.deleteBookmark(id);
    // Update the state to remove the deleted bookmark from the list
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
          Bookmark Content
        </Bookmark_Content>
      </div>
    </RootLayout>
  );
};

export default App;
