import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  fetchAllBookmarks: () => ipcRenderer.invoke('bookmark:fetchAll'),
  createBookmark: (bookmark: any) => ipcRenderer.invoke('bookmark:create', bookmark),
  deleteBookmark: (id: string) => ipcRenderer.invoke('bookmark:delete', id),
  onBookmarkCreated: (callback: any) => {
    const wrappedCallback = (event: any, ...args: any[]) => {
      console.log('Bookmark created event received in preload:', ...args);
      callback(event, ...args);
    };
    ipcRenderer.on('bookmark:created', wrappedCallback);
    return () => ipcRenderer.removeListener('bookmark:created', wrappedCallback);
  },
  onBookmarkDeleted: (callback: any) => {
    const wrappedCallback = (event: any, ...args: any[]) => {
      console.log('Bookmark deleted event received in preload:', ...args);
      callback(event, ...args);
    };
    ipcRenderer.on('bookmark:deleted', wrappedCallback);
    return () => ipcRenderer.removeListener('bookmark:deleted', wrappedCallback);
  },
  removeBookmarkListeners: () => {
    ipcRenderer.removeAllListeners('bookmark:created');
    ipcRenderer.removeAllListeners('bookmark:deleted');
  },
  createAccount: (username, password) =>
    ipcRenderer.invoke('create-account', { username, password }),
});