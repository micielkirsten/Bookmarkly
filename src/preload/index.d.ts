// src/main/preload/index.d.ts

export {};

declare global {
  interface Window {
    api: {
      fetchAllBookmarks: () => Promise<BookmarkData[]>;
      createBookmark: (bookmarkData: BookmarkData) => Promise<BookmarkData>;
      deleteBookmark: (id: string) => Promise<{ success: boolean }>;
    };
  }
}

interface BookmarkData {
  _doc: {
    title: string;
    tags: string;
    url: string;
    notes: string;
    createdAt: Date; // Adjust based on how you're storing this
    _id: string; // Ensure _id is a string for ease of use
  };
}