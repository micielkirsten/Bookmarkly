import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import connectDB from './database';
import Bookmark from './models/Bookmark';
import icon from '../../resources/icon.png?asset';

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'Bookmarkly',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
    },
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
};

// Connect to MongoDB when the app is ready
app.whenReady().then(async () => {
  await connectDB();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers for CRUD Operations

// Create a new bookmark
ipcMain.handle('bookmark:create', async (_event, bookmarkData) => {
  try {
    const newBookmark = new Bookmark(bookmarkData);
    await newBookmark.save();
    return newBookmark;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
});

// Get all bookmarks
ipcMain.handle('bookmark:fetchAll', async () => {
  try {
    const bookmarks = await Bookmark.find();
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
});

// Delete a bookmark by ID
ipcMain.handle('bookmark:delete', async (_event, bookmarkId) => {
  try {
    await Bookmark.findByIdAndDelete(bookmarkId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw error;
  }
});
