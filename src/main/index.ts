import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import connectDB from './database'; // Import the connectDB function to establish a MongoDB connection
import Bookmark from './models/Bookmark'; // Import the Bookmark model for handling bookmark data (CRUD operations)
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
  // Establish a connection to the MongoDB database before creating the window
  await connectDB();
  createWindow();

  // On macOS, recreate a window if the dock icon is clicked and no windows are open
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

// Handle fetching all bookmarks when the 'bookmark:fetchAll' event is invoked
ipcMain.handle('bookmark:fetchAll', async () => {
  try {
    // Retrieve all bookmark documents from the MongoDB database
    const bookmarks = await Bookmark.find();
    // Return the fetched bookmarks to the renderer process
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
});

// Delete a bookmark by ID
ipcMain.handle('bookmark:delete', async (_event, bookmarkId) => {
  try {
    // Find the bookmark by its ID and delete it from MongoDB
    await Bookmark.findByIdAndDelete(bookmarkId);
    // Return success confirmation to the renderer process
    return { success: true };
  } catch (error) {
    console.error('Error deleting bookmark:', error);
    throw error;
  }
});
