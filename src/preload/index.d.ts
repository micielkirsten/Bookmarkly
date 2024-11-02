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
  title: string;
  tags: string;
  url: string;
  notes: string;
}
