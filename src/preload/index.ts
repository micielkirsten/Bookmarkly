// src/main/preload/index.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  fetchAllBookmarks: () => ipcRenderer.invoke('bookmark:fetchAll'),
  createBookmark: (bookmarkData) => ipcRenderer.invoke('bookmark:create', bookmarkData),
  deleteBookmark: (id) => ipcRenderer.invoke('bookmark:delete', id),
});
