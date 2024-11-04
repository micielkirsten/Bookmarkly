// src/main/preload/index.d.ts

// This file needs to be treated as a module, so this export is necessary to avoid TypeScript errors.
export {};

declare global {
  interface Window {
    api: {
      fetchAllBookmarks: () => Promise<BookmarkData[]>; // Method to fetch all bookmarks from the database
      createBookmark: (bookmarkData: BookmarkData) => Promise<BookmarkData>; // Method to create a new bookmark in the database, receiving bookmark data and returning the saved bookmark
      deleteBookmark: (id: string) => Promise<{ success: boolean }>; // Method to delete a bookmark from the database by its ID, returning a success status
    };
  }
}

// Define the structure of the bookmark data that will be passed between the renderer and main processes
interface BookmarkData {
  title: string;
  tags: string;
  url: string;
  notes: string;
}
