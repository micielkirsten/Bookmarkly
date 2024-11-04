// src/main/preload/index.ts

// Import Electron's contextBridge and ipcRenderer to enable secure communication between the renderer process and the main process.
import { contextBridge, ipcRenderer } from 'electron';

// Use contextBridge to expose an API (called 'api') in the renderer process (window object),
// allowing secure interaction between the renderer and the main process for bookmark-related CRUD operations.
contextBridge.exposeInMainWorld('api', {

  // Method to fetch all bookmarks by invoking the 'bookmark:fetchAll' event in the main process.
  fetchAllBookmarks: () => ipcRenderer.invoke('bookmark:fetchAll'),
  // Method to create a new bookmark by invoking the 'bookmark:create' event in the main process,
  // and passing bookmark data to be saved in the database.
  createBookmark: (bookmarkData) => ipcRenderer.invoke('bookmark:create', bookmarkData),
  // Method to delete a bookmark by invoking the 'bookmark:delete' event in the main process,
  // passing the bookmark's ID to be deleted from the database.
  deleteBookmark: (id) => ipcRenderer.invoke('bookmark:delete', id),
});
