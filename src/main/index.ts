import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { is } from '@electron-toolkit/utils';
import connectDB from './database';
import Bookmark from './models/Bookmark';
import User from './models/User';
import icon from '../../resources/icon.png?asset';

let mainWindow;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
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

//Create
ipcMain.handle('bookmark:create', async (_event, bookmarkData) => {
  try {
    console.log('Attempting to create bookmark with data:', bookmarkData);

    const newBookmark = new Bookmark({
      title: bookmarkData.title || '',
      tags: bookmarkData.tags || '',
      url: bookmarkData.url || '',
      notes: bookmarkData.notes || ''
    });

    const savedBookmark = await newBookmark.save();
    const serializedBookmark = savedBookmark.toObject();
    serializedBookmark._id = serializedBookmark._id.toString();
    mainWindow.webContents.send('bookmark:created', serializedBookmark);
    
    return serializedBookmark;
  } catch (error) {
    console.error('Error creating bookmark:', error);
    throw error;
  }
});

//Fetch 
ipcMain.handle('bookmark:fetchAll', async () => {
  try {
    const bookmarks = await Bookmark.find();
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw error;
  }
});

//Delete
ipcMain.handle('bookmark:delete', async (_event, bookmarkId) => {
  try {

    let id;
    if (bookmarkId && bookmarkId.buffer && bookmarkId.buffer instanceof Uint8Array) {
      const buffer = Buffer.from(bookmarkId.buffer);
      id = buffer.toString('hex');
    } else if (bookmarkId && bookmarkId instanceof Uint8Array) {
      id = Buffer.from(bookmarkId).toString('hex');
    } else {
      id = bookmarkId;
    }
    
    const ObjectId = require('mongoose').Types.ObjectId;
    const mongoId = new ObjectId(id);

    const result = await Bookmark.findByIdAndDelete(mongoId);
    
    if (result) {
      const stringId = result._id.toString();
      BrowserWindow.getAllWindows().forEach(window => {
        window.webContents.send('bookmark:deleted', stringId);
      });
      
      return { success: true, id: stringId };
    } else {
      console.log('Bookmark not found:', id);
      return { success: false, error: 'Bookmark not found' };
    }
  } catch (error) {
    console.error('Error in delete handler:', error);
    throw error;
  }
});

// IPC handlers for account creation

ipcMain.handle('create-account', async (event, { username, password }) => {
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    const hashedPassword = password;

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return { success: true, message: 'Account created successfully!' };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'An error occurred while creating the account' };
  }
});

